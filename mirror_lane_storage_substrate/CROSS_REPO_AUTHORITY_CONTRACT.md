# Cross-Repository Authority Contract

## Purpose

Define how the KEX mirror/update lane is consumed by BRAINK and other repositories without moving ownership of mirror semantics out of `KEDDEH-CLOUD-SERVERS-ID-1`.

## Ownership boundary

```text
KEDDEH-CLOUD-SERVERS-ID-1
owns:
  mirror definition
  mirror manifest semantics
  update/restore runtime
  parity/corruption checks
  transfer receipt schema

BRAINK
owns:
  logical-computer identity
  R26/R31 state semantics
  research claim definition
  qualification/evidence reconciliation
  machine projection semantics
```

Neither side may infer authority merely from transport or file location.

## Interface contract

Consumer invokes the mirror runtime through an adapter or equivalent process boundary:

```text
consumer source state
→ update(source, mirror)
→ MIRROR_VERIFIED receipt
→ carrier may move mirror package
→ restore(mirror, destination)
→ RESTORE_VERIFIED receipt
→ consumer readback
```

The carrier between mirror production and mirror consumption may be GitHub artifact transfer, local filesystem, removable storage, network transfer, object storage or another transport. Changing the carrier does not change mirror semantic identity.

## Dependency rule

A consumer must pin or otherwise resolve an exact compatible mirror runtime revision for qualification. A branch name alone is insufficient evidence for a reproducible test.

## Failure ownership

- mirror parity/corruption failure -> cloud mirror runtime defect/input defect;
- subprocess/adapter invocation defect -> consumer integration defect;
- executor unavailable -> execution-lane blocker;
- consumer identity/state invariant failure after verified restore -> consumer rehydration defect;
- carrier damage detected by mirror manifest -> carrier corruption observed by mirror runtime.

## Promotion rule

Cross-repository integration is promoted only when:
1. mirror runtime qualification is observed;
2. consumer adapter qualification is observed;
3. exact revisions are recorded;
4. verified update and restore receipts agree on manifest digest;
5. consumer-specific invariants pass;
6. claimed evidence level matches executor topology.

A same-host test may qualify integration but may not be relabelled as cross-machine evidence.

## Cross-platform rule

The consumer depends on semantic capabilities, not hard-coded host paths. Platform-specific invocation and durable-write adapters may vary while receipt and parity contracts remain stable.
