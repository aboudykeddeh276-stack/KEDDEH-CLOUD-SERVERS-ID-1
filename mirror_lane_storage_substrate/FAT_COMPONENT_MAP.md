# FAT Component Map to KEX

## Boundary

This file maps FAT-style storage requirements into software-defined KEX requirements.

It does not replace physical disks, disk firmware, partition tables, operating system drivers, or hardware controllers.

## Component translation table

| FAT style component | Functional requirement | KEX mirror lane requirement |
|---|---|---|
| boot sector | declare format and reader parameters | genesis declaration |
| reserved area | protect format metadata | root authority lane |
| allocation table | map used and available chains | lane relation table |
| second allocation table | provide duplicate map | paired lane table |
| root directory | expose top level names | root lexicon lane |
| subdirectory | nested name container | nested lexicon route |
| file entry | named data object | whole entry descriptor |
| cluster | addressable data group | whole cell group |
| cluster chain | ordered continuation | route sequence |
| free cluster | available place | available state declaration |
| deleted entry | previously used object | released state with trace |
| end of chain | stop condition | terminal relation state |
| volume label | readable storage identity | substrate name declaration |
| file attributes | permissions and metadata | entry state flags |
| timestamp fields | history markers | event trace phrases |

## Conversion rule

KEX keeps the software requirement and changes the representation logic.

The mapped disk is a software surface. The real disk remains unchanged.
