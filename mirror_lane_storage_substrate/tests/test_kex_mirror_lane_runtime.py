from __future__ import annotations

import importlib.util
from pathlib import Path

RUNTIME = Path(__file__).resolve().parents[1] / "runtime" / "kex_mirror_lane_runtime.py"
spec = importlib.util.spec_from_file_location("kex_mirror_lane_runtime", RUNTIME)
mod = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(mod)


def write_tree(root: Path, mapping: dict[str, bytes]) -> None:
    for rel, data in mapping.items():
        p = root / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data)


def test_update_and_restore_exact_parity(tmp_path: Path):
    source = tmp_path / "source"
    mirror = tmp_path / "mirror"
    restored = tmp_path / "restored"
    write_tree(source, {"computer.json": b'{"id":"A"}', "nested/state.bin": b"abc\x00def"})

    first = mod.update(source, mirror)
    assert first["status"] == "MIRROR_VERIFIED"
    assert first["file_count"] == 2
    assert first["manifest_digest"] == mod.build_manifest(source)["manifest_digest"]

    second = mod.update(source, mirror)
    assert second["manifest_digest"] == first["manifest_digest"]

    result = mod.restore(mirror, restored)
    assert result["status"] == "RESTORE_VERIFIED"
    assert mod.build_manifest(restored)["manifest_digest"] == first["manifest_digest"]


def test_update_removes_stale_replica_files(tmp_path: Path):
    source = tmp_path / "source"
    mirror = tmp_path / "mirror"
    write_tree(source, {"a.txt": b"one"})
    mod.update(source, mirror)
    (mirror / "stale.txt").write_text("stale")
    (source / "a.txt").write_text("two")
    receipt = mod.update(source, mirror)
    assert receipt["status"] == "MIRROR_VERIFIED"
    assert not (mirror / "stale.txt").exists()
    assert (mirror / "a.txt").read_text() == "two"


def test_restore_rejects_corrupted_mirror(tmp_path: Path):
    source = tmp_path / "source"
    mirror = tmp_path / "mirror"
    restored = tmp_path / "restored"
    write_tree(source, {"computer.json": b"valid"})
    mod.update(source, mirror)
    (mirror / "computer.json").write_bytes(b"tampered")
    try:
        mod.restore(mirror, restored)
    except RuntimeError as exc:
        assert "MIRROR_SOURCE_CORRUPTED" in str(exc)
    else:
        raise AssertionError("corrupted mirror was accepted")
