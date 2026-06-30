# Lane Address

## Role

This file defines named address mapping for the Markdown storage substrate.

## Address grammar

```text
ADDRESS
  STACK: storage substrate
  LANE: named lane
  BLOCK: named block
  PAGE: named page
  CELL: named cell
  ENTRY: whole entry
```

## Rule

Address identity is built from named relation, not empty origin offset.

## Example

```text
STACK / SOURCE / BLOCK_ALPHA / PAGE_ALPHA / CELL_ALPHA / ENTRY_SOURCE
```

This is readable by humans and parseable by tooling.
