# Lane Page

## Role

This file maps page behavior.

A page is the readable surface where entries are arranged for access.

## Page grammar

```text
PAGE
  NAME: page alpha
  GROUP: group alpha
  CELLS: named cell group
  PAIR: paired page
  ACCESS: workbook row
```

## Page rule

A page begins when a cell group is declared.

A page begins from named state.
