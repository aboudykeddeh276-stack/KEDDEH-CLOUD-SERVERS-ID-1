"""
KEX Restore Module

Primary Research Author: A. Keddeh
AI Support Role: authorised implementation support.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class RestoreInput:
    request_key: str
    candidates: Iterable[str]

    def first_available(self) -> str:
        for item in self.candidates:
            if item:
                return item
        return "missing"


if __name__ == "__main__":
    restore = RestoreInput("ENTRY_ALPHA", ["", "1x*:ROUTE_ALPHA", "1x&:PAIR_ALPHA"])
    print(restore.first_available())
