# KEX Mirror Lane Filing and Evidence Standard

## Filing classes

```text
DEFINITION / GOVERNANCE
mirror_lane_storage_substrate/*.md
mirror_lane_storage_substrate/MIRROR_LANE_COMPONENT_SPEC.json

SOURCE
mirror_lane_storage_substrate/runtime/
mirror_lane_storage_substrate/software_skeletons/

QUALIFICATION
mirror_lane_storage_substrate/tests/

RUNTIME STATE
outside Git unless a test fixture is intentionally versioned

EVIDENCE
mirror_lane_storage_substrate/evidence/ or workflow artifacts
```

Source, runtime state and evidence are different classes. A source file is not a runtime receipt, and a runtime mirror directory is not source governance.

## Schema requirements

Mirror manifest schema: `kex.mirror-lane.manifest.v1`.

Required fields:
- schema;
- runtime;
- entries;
- file_count;
- byte_count;
- manifest_digest.

Each manifest entry contains:
- relative path;
- byte size;
- SHA-256 digest.

Transfer receipt schema: `kex.mirror-lane.transfer-receipt.v1`.

Required fields:
- schema;
- status;
- runtime;
- source_root;
- mirror_root;
- manifest_digest;
- file_count;
- byte_count.

## Evidence envelope

Cross-repository qualification evidence must additionally identify:
- producing repository;
- producing commit SHA;
- consuming repository;
- consuming commit SHA;
- executor/lane;
- claimed evidence level;
- consumer invariant result.

The runtime receipt may be embedded in a higher-level evidence envelope. Do not silently change the mirror receipt schema to carry unrelated consumer semantics.

## Authorship/accountability

Repository source and control artifacts preserve the authorship convention in `AUTHORSHIP.md`. Runtime evidence must separately identify the executing process/workflow and commit lineage. Authorship does not substitute for runtime authority or execution identity.

## Versioning

Breaking semantic changes require new schema/runtime versions. File renaming alone does not create a new semantic version. A runtime version is promoted only when implementation, tests, controls and dependency declarations agree on the same contract.

## Secret and sensitive data rule

Do not mirror secrets into repository evidence merely because the mirror runtime can replicate arbitrary files. Qualification fixtures must avoid private keys, credentials and account secrets. Production consumers must define exclusion/encryption policy at their own authority boundary.

## Retention

Evidence supporting promotion should be immutable or uniquely versioned and resolvable to exact repository SHAs. Transient runner paths are carrier metadata, not durable identity.

## Invalid filing patterns

- runtime evidence stored only in console prose;
- unversioned JSON whose schema meaning changes silently;
- copying BRAINK governance files into this repo as competing authority;
- storing consumer-specific identity logic inside the mirror runtime;
- calling a mirror directory an authoritative primary merely because replication completed.
