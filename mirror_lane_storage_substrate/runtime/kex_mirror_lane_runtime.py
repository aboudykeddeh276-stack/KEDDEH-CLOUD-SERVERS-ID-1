#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import tempfile
from pathlib import Path
from typing import Iterable

RUNTIME_ID = "runtime://kex/mirror-lane/state-transfer/r1"
MANIFEST_NAME = ".kex-mirror-manifest.json"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def iter_files(root: Path) -> Iterable[Path]:
    for path in sorted(root.rglob("*")):
        if path.is_file() and path.name != MANIFEST_NAME:
            yield path


def build_manifest(root: Path) -> dict:
    entries = []
    byte_count = 0
    for path in iter_files(root):
        rel = path.relative_to(root).as_posix()
        size = path.stat().st_size
        byte_count += size
        entries.append({"path": rel, "size": size, "sha256": sha256_file(path)})
    canonical = json.dumps(entries, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return {
        "schema": "kex.mirror-lane.manifest.v1",
        "runtime": RUNTIME_ID,
        "entries": entries,
        "file_count": len(entries),
        "byte_count": byte_count,
        "manifest_digest": hashlib.sha256(canonical).hexdigest(),
    }


def fsync_dir(path: Path) -> None:
    fd = os.open(path, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


def atomic_copy(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix=dst.name + ".", suffix=".tmp", dir=str(dst.parent))
    os.close(fd)
    tmp = Path(tmp_name)
    try:
        with src.open("rb") as sfh, tmp.open("wb") as dfh:
            shutil.copyfileobj(sfh, dfh, 1024 * 1024)
            dfh.flush()
            os.fsync(dfh.fileno())
        os.replace(tmp, dst)
        fsync_dir(dst.parent)
    finally:
        if tmp.exists():
            tmp.unlink()


def remove_stale_files(root: Path, wanted: set[str]) -> None:
    for path in list(iter_files(root)):
        rel = path.relative_to(root).as_posix()
        if rel not in wanted:
            path.unlink()
    for directory in sorted((p for p in root.rglob("*") if p.is_dir()), reverse=True):
        try:
            directory.rmdir()
        except OSError:
            pass


def write_manifest(root: Path, manifest: dict) -> None:
    root.mkdir(parents=True, exist_ok=True)
    target = root / MANIFEST_NAME
    fd, tmp_name = tempfile.mkstemp(prefix=MANIFEST_NAME + ".", suffix=".tmp", dir=str(root))
    os.close(fd)
    tmp = Path(tmp_name)
    try:
        with tmp.open("w", encoding="utf-8") as fh:
            json.dump(manifest, fh, indent=2, sort_keys=True)
            fh.write("\n")
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, target)
        fsync_dir(root)
    finally:
        if tmp.exists():
            tmp.unlink()


def replicate(source: Path, destination: Path) -> dict:
    if not source.exists() or not source.is_dir():
        raise RuntimeError(f"SOURCE_ROOT_UNAVAILABLE:{source}")
    destination.mkdir(parents=True, exist_ok=True)
    source_manifest = build_manifest(source)
    wanted = {entry["path"] for entry in source_manifest["entries"]}
    remove_stale_files(destination, wanted)
    for entry in source_manifest["entries"]:
        rel = Path(entry["path"])
        src = source / rel
        dst = destination / rel
        if dst.exists() and dst.stat().st_size == entry["size"] and sha256_file(dst) == entry["sha256"]:
            continue
        atomic_copy(src, dst)
    observed = build_manifest(destination)
    if observed["manifest_digest"] != source_manifest["manifest_digest"]:
        raise RuntimeError("MIRROR_PARITY_MISMATCH")
    write_manifest(destination, source_manifest)
    return source_manifest


def update(source: Path, mirror: Path) -> dict:
    manifest = replicate(source, mirror)
    return {
        "schema": "kex.mirror-lane.transfer-receipt.v1",
        "status": "MIRROR_VERIFIED",
        "runtime": RUNTIME_ID,
        "source_root": str(source.resolve()),
        "mirror_root": str(mirror.resolve()),
        "manifest_digest": manifest["manifest_digest"],
        "file_count": manifest["file_count"],
        "byte_count": manifest["byte_count"],
    }


def restore(mirror: Path, destination: Path) -> dict:
    if not (mirror / MANIFEST_NAME).exists():
        raise RuntimeError("MIRROR_MANIFEST_MISSING")
    stored = json.loads((mirror / MANIFEST_NAME).read_text("utf-8"))
    observed = build_manifest(mirror)
    if observed["manifest_digest"] != stored.get("manifest_digest"):
        raise RuntimeError("MIRROR_SOURCE_CORRUPTED")
    manifest = replicate(mirror, destination)
    return {
        "schema": "kex.mirror-lane.transfer-receipt.v1",
        "status": "RESTORE_VERIFIED",
        "runtime": RUNTIME_ID,
        "source_root": str(destination.resolve()),
        "mirror_root": str(mirror.resolve()),
        "manifest_digest": manifest["manifest_digest"],
        "file_count": manifest["file_count"],
        "byte_count": manifest["byte_count"],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="command", required=True)
    p_update = sub.add_parser("update")
    p_update.add_argument("--source", required=True)
    p_update.add_argument("--mirror", required=True)
    p_update.add_argument("--json", action="store_true")
    p_restore = sub.add_parser("restore")
    p_restore.add_argument("--mirror", required=True)
    p_restore.add_argument("--destination", required=True)
    p_restore.add_argument("--json", action="store_true")
    args = parser.parse_args()
    try:
        if args.command == "update":
            receipt = update(Path(args.source), Path(args.mirror))
        else:
            receipt = restore(Path(args.mirror), Path(args.destination))
    except Exception as exc:
        print(json.dumps({"status": "BLOCKED", "runtime": RUNTIME_ID, "reason": str(exc)}, sort_keys=True))
        return 2
    print(json.dumps(receipt, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
