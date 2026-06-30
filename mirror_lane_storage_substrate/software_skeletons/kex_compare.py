"""
KEX Compare Module

Primary Research Author: A. Keddeh
AI Support Role: authorised implementation support.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class CompareRecord:
    left_key: str
    right_key: str
    left_value: str
    right_value: str

    def status(self) -> str:
        if self.left_value == self.right_value:
            return "present"
        return "review"


if __name__ == "__main__":
    item = CompareRecord("1x*:A", "1x&:A", "state", "state")
    print(item.status())
