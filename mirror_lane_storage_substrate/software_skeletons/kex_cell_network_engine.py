"""
KEX Cell Network Engine

Primary Research Author: A. Keddeh
AI Support Role: authorised agent for documentation and implementation support.

This module models emulated server, network, drive, cell, route, mirror,
parity, and restore objects as software records.
It does not control physical disks.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Literal, Optional, Tuple

State = Literal["present", "available", "review", "terminal", "released"]


@dataclass(frozen=True)
class Coordinate:
    """1x symbolic coordinate family."""

    family: str
    server: str
    network: str
    drive: str
    cell: str
    route: str
    pair: str
    trace: str

    def key(self) -> str:
        if not self.family.startswith("1x"):
            raise ValueError("KEX coordinate family must begin from 1x")
        return ":".join([
            self.family,
            self.server,
            self.network,
            self.drive,
            self.cell,
            self.route,
            self.pair,
            self.trace,
        ])


@dataclass
class CellState:
    """Whole state-bearing cell entry."""

    name: str
    coordinate: Coordinate
    state: State
    payload: str = ""
    formula_route: str = ""
    mirror_key: Optional[str] = None


@dataclass
class EmulatedDriveObject:
    """Written hard drive object carried by files, Markdown stacks, and workbook routes."""

    name: str
    coordinate_family: str
    cells: Dict[str, CellState] = field(default_factory=dict)

    def add_cell(self, cell: CellState) -> None:
        key = cell.coordinate.key()
        self.cells[key] = cell

    def get_cell(self, key: str) -> Optional[CellState]:
        return self.cells.get(key)


@dataclass
class EmulatedServerObject:
    """Server object containing emulated drive objects."""

    name: str
    drives: Dict[str, EmulatedDriveObject] = field(default_factory=dict)

    def add_drive(self, drive: EmulatedDriveObject) -> None:
        self.drives[drive.name] = drive


class KEXCellNetworkEngine:
    """Registry and route engine for cell-native software volumes."""

    def __init__(self) -> None:
        self.servers: Dict[str, EmulatedServerObject] = {}

    def add_server(self, server: EmulatedServerObject) -> None:
        self.servers[server.name] = server

    def resolve(self, server_name: str, drive_name: str, coordinate_key: str) -> Optional[CellState]:
        server = self.servers.get(server_name)
        if server is None:
            return None
        drive = server.drives.get(drive_name)
        if drive is None:
            return None
        return drive.get_cell(coordinate_key)

    def same_one_cell_key(self, row_key: str, column_key: str, family_key: str) -> str:
        """Logical same-1 spreadsheet traversal expression."""
        if not family_key.startswith("1x"):
            raise ValueError("family_key must begin from 1x")
        return f"{family_key}:{row_key}:{column_key}"

    def compare_pair(self, source: CellState, mirror: CellState) -> State:
        """Return present if source and mirror agree, otherwise review."""
        if source.payload == mirror.payload and source.formula_route == mirror.formula_route:
            return "present"
        return "review"


def demo() -> Tuple[str, str]:
    engine = KEXCellNetworkEngine()
    server = EmulatedServerObject(name="SERVER_ALPHA")
    drive = EmulatedDriveObject(name="DRIVE_ALPHA", coordinate_family="1x*")
    coordinate = Coordinate(
        family="1x*",
        server="SERVER_ALPHA",
        network="NET_ALPHA",
        drive="DRIVE_ALPHA",
        cell="CELL_ALPHA",
        route="ROUTE_ALPHA",
        pair="PAIR_ALPHA",
        trace="TRACE_ALPHA",
    )
    cell = CellState(
        name="ENTRY_ALPHA",
        coordinate=coordinate,
        state="present",
        payload="whole cell state",
        formula_route="ROW_KEY + COLUMN_KEY + FAMILY_KEY -> CELL_STATE",
    )
    drive.add_cell(cell)
    server.add_drive(drive)
    engine.add_server(server)
    resolved = engine.resolve("SERVER_ALPHA", "DRIVE_ALPHA", coordinate.key())
    return coordinate.key(), resolved.name if resolved else "missing"


if __name__ == "__main__":
    print(demo())
