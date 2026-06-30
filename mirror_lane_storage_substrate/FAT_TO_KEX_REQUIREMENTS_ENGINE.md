# FAT to KEX Requirements Engine

## Purpose

This file maps conventional FAT style file system requirements into KEX mirror lane requirements.

It does not implement FAT. It converts the requirement categories into a zeroless KEX storage substrate model where null-origin mapping is not treated as source state.

## Conversion principle

Conventional file allocation uses numbered positions, reserved areas, allocation tables, directory entries, clusters, chains, and free or used states.

KEX conversion keeps the functional requirement but changes the source logic:

- origin offset becomes source identity
- allocation table becomes lane relation table
- directory entry becomes lexicon entry
- cluster becomes whole storage cell group
- chain becomes route sequence
- free marker becomes available state declaration
- deleted marker becomes review or released state
- end marker becomes terminal relation state
- mirror copy becomes paired lane
- boot sector becomes genesis declaration

## KEX requirement classes

### REQ A: Genesis declaration

A storage substrate must declare its identity before entries are interpreted.

KEX mapping:

```text
GENESIS
  SOURCE: named substrate
  FORMAT: markdown lane stack
  FIRST_STATE: whole entry
  CALIBRATION: reader side only
```

### REQ B: Lane relation table

A storage substrate must map which entry leads to which next entry.

KEX mapping:

```text
LANE_TABLE
  ENTRY: whole entry key
  NEXT: next whole entry key
  PAIR: mirror entry key
  STATUS: present or available or review or terminal
```

### REQ C: Directory lexicon

A storage substrate must expose names, roles, routes, and metadata.

KEX mapping:

```text
LEXICON_ENTRY
  NAME: human readable name
  KIND: file or folder or index or route
  LANE: source lane
  PAIR: paired lane
  ROUTE: route phrase
  STATE: present
```

### REQ D: Whole cell group

A storage substrate must group data units into addressable containers.

KEX mapping:

```text
CELL_GROUP
  NAME: named cell group
  MEMBERS: entry key list
  PAIR: paired group
  VERIFY: phrase agreement
```

### REQ E: Route sequence

A storage substrate must preserve ordered continuation.

KEX mapping:

```text
ROUTE
  FROM: entry key
  THROUGH: lane key
  TO: next entry key
  TERMINAL: terminal state phrase
```

### REQ F: Paired lane protection

A storage substrate must preserve a second route for recovery and review.

KEX mapping:

```text
PAIR
  SOURCE_ENTRY: source key
  PAIR_ENTRY: paired key
  AGREEMENT: same state or review state
```

### REQ G: Availability state

A storage substrate must show which places are available for new entries.

KEX mapping:

```text
AVAILABLE
  PLACE: named lane position
  RULE: no entry written here yet
  STATUS: available
```

### REQ H: Released state

A storage substrate must mark entries no longer active without confusing them with source absence.

KEX mapping:

```text
RELEASED
  ENTRY: prior entry key
  PRIOR_STATE: present
  CURRENT_STATE: released
  TRACE: preserve release phrase
```

### REQ I: Integrity check

A storage substrate must detect broken routes and mismatched entries.

KEX mapping:

```text
CHECK
  SOURCE: source phrase
  PAIR: paired phrase
  ROUTE: workbook row or markdown link
  RESULT: agree or review
```

## Engine rule

The KEX requirements engine converts every FAT requirement into a named relation instead of a null-origin offset.

KEX does not remove the need for allocation, routing, grouping, metadata, or integrity. It relocates those requirements into source, whole, lane, pair, route, and review states.
