# KEX Mirror Lane Process and Workflow Control

## Controlled process

```text
INVENTORY OBJECT RESOLVED
→ COMPONENT SPEC ADMITTED
→ EXACT REPOSITORY SHA RESOLVED
→ SOURCE/MIRROR ROOTS RESOLVED
→ PRE-TRANSFER MANIFEST
→ MIRROR UPDATE
→ POST-UPDATE PARITY READBACK
→ MIRROR MANIFEST PERSISTED
→ CONSUMER TRANSFER/CARRIER
→ MIRROR RESTORE
→ POST-RESTORE PARITY READBACK
→ CONSUMER-SPECIFIC INVARIANT CHECK
→ EVIDENCE RECEIPT
→ PROMOTE OR BLOCK
```

## Admission controls

Before mutation:
- runtime path must resolve to `runtime://kex/mirror-lane/state-transfer/r1`;
- exact repository commit SHA must be recorded by the consuming workflow;
- source must be a readable directory;
- destination authority and consumer must be declared;
- consumer must state what constitutes successful consumption after restore;
- execution lane availability must be recorded independently from application status.

## Update controls

The update actuator must:
1. build a deterministic relative-path manifest;
2. hash each file with SHA-256;
3. remove stale replica files;
4. atomically replace changed files;
5. flush replaced files and containing directories using the platform contract;
6. rebuild the observed mirror manifest;
7. reject parity mismatch;
8. persist `.kex-mirror-manifest.json` only after parity succeeds.

## Restore controls

The restore actuator must:
1. require the persisted mirror manifest;
2. rebuild the current mirror manifest before restore;
3. reject corrupted/divergent mirror state;
4. restore through the same governed replication primitive;
5. verify restored parity;
6. return `RESTORE_VERIFIED` only after parity succeeds.

## Consumer control

A successful mirror receipt proves state-transfer parity only. It does not prove that a consuming runtime accepted or correctly used that state.

For BRAINK logical-computer migration the downstream consumer must separately prove:
- logical ID invariant;
- persistent state digest invariant;
- lineage invariant;
- authority invariant;
- changed machine projection where cross-host evidence is claimed.

## Failure classification

```text
EXECUTOR_UNAVAILABLE
→ BLOCKED_EXECUTION_LANE

SOURCE_ROOT_UNAVAILABLE
→ BLOCKED_INPUT

MIRROR_PARITY_MISMATCH
→ REJECTED_MIRROR_UPDATE

MIRROR_SOURCE_CORRUPTED
→ REJECTED_RESTORE_SOURCE

CONSUMER_INVARIANT_FAILURE
→ REJECTED_CONSUMER_REHYDRATION
```

Do not collapse these statuses into one generic failure.

## Rollback and preservation

The mirror lane is not the authority to destroy the source state. Source authoritative state remains available until the downstream consumer has completed its own qualification. Failed restores do not authorize promotion or deletion of the previous authoritative state.

## Cross-platform adaptation

Platform adapters may alter durable-write mechanics but may not weaken:
- relative-path manifest semantics;
- per-file SHA-256 verification;
- whole-manifest parity;
- stale-file reconciliation;
- corruption rejection;
- receipt semantics.

## Workflow evidence

Each execution lane records:
- repository + exact SHA;
- executor identity/type;
- runtime path;
- source/mirror/destination role, without treating paths as logical identity;
- manifest digest;
- file and byte counts;
- runtime result;
- downstream consumer result;
- qualification evidence level.

Queued/pending workflow state is not execution proof.
