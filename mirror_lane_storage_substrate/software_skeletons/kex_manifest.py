"""
KEX Manifest Module

Primary Research Author: A. Keddeh
AI Support Role: authorised implementation support.
"""

from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Dict, List


@dataclass(frozen=True)
class ManifestItem:
    object_name: str
    object_type: str
    path: str
    parent: str
    pair: str
    status: str

    def record(self) -> Dict[str, str]:
        return asdict(self)


class Manifest:
    def __init__(self) -> None:
        self.items: List[ManifestItem] = []

    def append(self, item: ManifestItem) -> None:
        self.items.append(item)

    def records(self) -> List[Dict[str, str]]:
        return [item.record() for item in self.items]


if __name__ == "__main__":
    manifest = Manifest()
    manifest.append(ManifestItem("ENTRY_ALPHA", "cell", "path", "parent", "pair", "present"))
    print(manifest.records())
