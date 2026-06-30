"""
KEX Same-1 Traversal Module

Primary Research Author: A. Keddeh
AI Support Role: authorised implementation support.

This module defines logical traversal for a workbook substrate whose corner,
row axis, and column axis begin from the same first whole point.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class SameOneAddress:
    corner_anchor: str
    row_key: str
    column_key: str
    family_key: str

    def __post_init__(self) -> None:
        if self.corner_anchor != "1":
            raise ValueError("corner_anchor must be 1")
        if not self.family_key.startswith("1x"):
            raise ValueError("family_key must begin from 1x")

    def cell_state_key(self) -> str:
        return f"{self.family_key}:{self.row_key}:{self.column_key}"


def resolve_same_one(row_key: str, column_key: str, family_key: str = "1x*") -> str:
    address = SameOneAddress(
        corner_anchor="1",
        row_key=row_key,
        column_key=column_key,
        family_key=family_key,
    )
    return address.cell_state_key()


if __name__ == "__main__":
    print(resolve_same_one("ROW_ALPHA", "COLUMN_ALPHA"))
