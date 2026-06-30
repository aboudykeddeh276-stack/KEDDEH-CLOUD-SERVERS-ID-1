# Spreadsheet Same-1 Skill Doctrine

## Purpose

This file records the spreadsheet skill doctrine for the KEX mirror lane storage substrate.

It is a repo-facing skill note. It does not modify external assistant system files.

## Core doctrine

A spreadsheet used as a KEX substrate should treat its corner anchor as `1`.

The row axis and column axis both begin from the same first whole point.

```text
CORNER: 1
ROW_START: 1
COLUMN_START: 1
CELL: row relation plus column relation
```

## Why this matters

A spreadsheet should not be treated as a passive grid beginning from absence.

When the corner is `1`, the spreadsheet is a relation engine.

Each populated cell is an intersection of two state-bearing lanes.

Each formula is a traversal rule.

Each sheet is a lane surface.

Each workbook is a mapped substrate.

## Traversal rule

Traversal is not counted from a null origin.

Traversal is resolved through relation:

```text
row key + column key + family key -> cell state
```

The software lookup can therefore jump directly to the intended relation if the keys and formula map are known.

This is the KEX meaning of instant traversal.

It is a logical traversal claim, not a claim that physical hardware latency disappears.

## Storage impact

When the workbook stores formulas, the workbook stores wiring.

The formula can represent a route, mirror lane, recovery condition, or drive-object relationship.

That means the workbook can carry a compact logical map of a much larger emulated storage surface.

## Required implementation behaviour

KEX spreadsheet substrate files should include:

- same-1 corner declaration
- row lane definitions
- column lane definitions
- coordinate family definitions
- formula route definitions
- mirror lane references
- parity or review formulas
- restore route notes

## Invalid interpretation

The doctrine does not say a spreadsheet physically stores more raw bytes than hardware.

It says that the spreadsheet can store higher-order logical relations and route wiring more compactly than a raw physical disk image.
