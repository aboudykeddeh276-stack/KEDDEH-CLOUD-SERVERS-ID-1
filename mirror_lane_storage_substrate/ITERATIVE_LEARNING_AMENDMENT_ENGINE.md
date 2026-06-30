# Iterative Learning Amendment Engine

## Purpose

This file defines how the KEX mirror lane storage substrate should keep learning, amending, and extending itself as new proofs, mappings, software sections, and implementation rules are added.

The engine is additive. It does not overwrite the base storage system.

## Core learning loop

```text
OBSERVE
-> EXTRACT
-> CLASSIFY
-> MAP
-> IMPLEMENT
-> VERIFY
-> AMEND
-> PRESERVE
-> RECURSE
```

## Meaning of each step

OBSERVE means read the new concept, correction, proof claim, code output, or storage behaviour.

EXTRACT means identify the smallest useful primitives inside it.

CLASSIFY means decide whether the item is an axiom, definition, requirement, implementation, test, boundary, or hypothesis.

MAP means place the item into the correct lane: cell, workbook, network, server, drive, route, mirror, parity, restore, or manifest.

IMPLEMENT means create a software section, Markdown file, workbook schema, route rule, or code skeleton to make the concept usable.

VERIFY means test for internal consistency and avoid claiming physical effects that were not demonstrated.

AMEND means update the substrate with the corrected understanding.

PRESERVE means keep the prior state as history instead of deleting the learning path.

RECURSE means repeat the loop for the next correction.

## Learning rule

Each new concept must improve the substrate by adding at least one of the following:

- clearer definition
- stronger boundary
- route rule
- cell grammar
- workbook formula requirement
- network object
- drive object
- mirror lane
- parity rule
- restore rule
- implementation skeleton
- validation test

## Proof boundary

The KEX laws can guide software design and storage mapping.

A claim is marked as implemented only when it exists as a file, schema, code path, formula rule, test, or executable module.

A claim is marked as validated only when it has repeatable evidence.

## Amendment format

Every amendment should be written as:

```text
AMENDMENT
  SOURCE: what caused the change
  CLAIM: what changed
  LANE: where it belongs
  SOFTWARE_EFFECT: what must now be built
  BOUNDARY: what is not being claimed
  NEXT: what must be implemented next
```

## Current active amendments

- Null-origin mapping is rejected for substrate coordinates.
- Cell-native storage is treated as the active logical substrate.
- Markdown files act as cell stacks.
- Workbooks act as route indexes and formula wiring surfaces.
- Emulated drive objects are nested into emulated server and network objects.
- The 1000 TB volume is a logical software volume, not a raw hardware capacity claim.
- Spreadsheet same-1 corner doctrine is required for KEX workbook substrates.
- Symbolic coordinate families begin from 1x rather than null-prefixed hex mapping.
