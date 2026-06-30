# Coordinate Model

## Purpose

Define the 1x coordinate family used by the cell-native substrate.

## Fields

- family
- server
- lane
- cell
- route
- pair
- trace

## Rule

The family field must begin with `1x`.

## Key shape

```text
1x<FAMILY>:SERVER:LANE:CELL:ROUTE:PAIR:TRACE
```

## Same-1 spreadsheet key

```text
FAMILY_KEY + ROW_KEY + COLUMN_KEY -> CELL_STATE
```

## Implementation note

This model can later be implemented as Python, TypeScript, workbook formulas, or Markdown schema.
