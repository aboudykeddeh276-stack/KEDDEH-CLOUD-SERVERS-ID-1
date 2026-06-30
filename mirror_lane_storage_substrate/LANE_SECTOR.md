# Lane Sector

## Role

This file maps sector behavior in a symbolic storage layer.

A sector is a stable area that groups named storage units for routing and recovery.

## Sector grammar

```text
SECTOR
  NAME: sector alpha
  GROUPS: named group set
  PAIR: paired sector
  ROUTE: access lane
  RECOVERY: pair then route then phrase
```

## Sector rule

Sector identity is relational.

The sector can be reconstructed from source lane, paired lane, and workbook route.
