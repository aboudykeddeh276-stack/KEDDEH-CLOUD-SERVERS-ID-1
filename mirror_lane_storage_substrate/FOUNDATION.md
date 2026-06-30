# Foundation

## Definitions

X means unresolved source before translation.

Whole means first valid state bearing storage entry.

Lane means ordered path through which entries are read, written, mirrored, and verified.

Mirror lane means paired route that preserves the same state in an alternate address surface.

Substrate means the layer that can hold structured state and allow reconstruction.

## Invalid storage source

A null mark cannot be storage source because it has no state content.

A storage system must begin from a whole entry or unresolved source.

## Valid calibration use

A reset mark may exist inside a tool or reader as a calibration event, but it is not the storage state itself.

## Required rule

Every lane begins from source identity, then whole entry, then relation.
