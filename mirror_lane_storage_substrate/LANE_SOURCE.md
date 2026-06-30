# Lane Source

## Role

This file defines the source lane.

The source lane holds the first readable declaration of storage identity.

## Entry grammar

```text
ENTRY
  KEY: source name
  KIND: whole
  STATE: present
  MIRROR: paired lane
  TRACE: proof phrase
```

## Source rule

A file is not empty storage when it carries a defined entry grammar.

Blank is not null. Blank means no written entry in that position. Null marker is not used as source.

## Expansion

The source lane expands into mirror, parity, address, block, page, sector, access, and workbook surface.
