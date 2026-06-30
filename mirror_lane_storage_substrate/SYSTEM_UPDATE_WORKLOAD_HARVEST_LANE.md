# System Update Workload Harvest Lane

## Purpose

This lane exists to harvest newly identified workload objects before work continues.

It is separate from the main pending workload register so that system update events can be parsed, replayed, and used to amend the workload list.

## Trigger grammar

A new workload is identified using this phrase:

```text
WORKLOAD OBJECT IDENTIFIED: <short workload name>
```

Work progress is recorded using this phrase:

```text
WORK ON OBJECT <ID>: <complete | in progress | blocked | tested | supported>
```

## Harvest rule

When `WORKLOAD OBJECT IDENTIFIED:` appears, the workload must be added to `PENDING_WORKLOAD_REGISTER.md` before substantive work continues.

When `WORK ON OBJECT <ID>:` appears, the workload register must be updated to reflect the new status.

## Object fields

```text
OBJECT_ID: workload identifier
NAME: workload name
SOURCE: user direction, proof result, software need, blocked task, or discovered dependency
STATUS: pending, in progress, complete, blocked, tested, supported
EVIDENCE_PATH: file, schema, code module, test, or note
NEXT_ACTION: next required action
```

## Current harvested objects

### OBJECT_NINE: Workload harvest automation lane

WORKLOAD OBJECT IDENTIFIED: Workload harvest automation lane

WORK ON OBJECT NINE: complete

Evidence path: mirror_lane_storage_substrate/SYSTEM_UPDATE_WORKLOAD_HARVEST_LANE.md

### OBJECT_TEN: Separate software modules from unified skeleton

WORKLOAD OBJECT IDENTIFIED: Split unified KEX cell network engine into separate modules for traversal, registry, parity, restore, manifest, and tests.

WORK ON OBJECT TEN: in progress

Evidence path: pending

### OBJECT_ELEVEN: Workload completion audit

WORKLOAD OBJECT IDENTIFIED: Audit the pending workload register and ensure every identified workload is actioned, tested, supported, or explicitly blocked.

WORK ON OBJECT ELEVEN: in progress

Evidence path: pending
