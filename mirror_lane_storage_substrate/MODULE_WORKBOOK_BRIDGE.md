# Module Workbook Bridge

## Purpose

Map workbook rows and columns to KEX cell states.

## Required fields

- workbook name
- sheet name
- corner anchor
- row key
- column key
- family key
- cell state

## Same-1 rule

The corner anchor is `1`.

The row axis and column axis begin from the same first whole point.

## Lookup rule

```text
family key plus row key plus column key gives cell state
```

## Output

The bridge should return the matched cell state.
