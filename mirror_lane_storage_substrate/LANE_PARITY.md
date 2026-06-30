# Lane Parity

## Role

This file defines parity as agreement between source phrase, paired phrase, and workbook route.

## Parity grammar

```text
PARITY
  SOURCE_PHRASE: declared entry
  PAIR_PHRASE: paired entry
  WORKBOOK_ROUTE: named row
  RESULT: agree or review
```

## Verification rule

A valid entry should be recoverable through at least two routes:

- source lane
- paired lane
- workbook route
- repository path

If only one route exists, the entry is present but not protected.
