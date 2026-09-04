# Workload Register

This register is updated as work is identified and completed.

## Workload Objects

| Workload ID | Name | Status | Parent | Repository paths | Completion condition |
|---|---|---|---|---|---|
| WL-0001 | Workload harvesting lane | completed | KEX-LEDGER-INV-0001 | docs/WORKLOAD_HARVESTING_LANE.md | Lane document exists and defines object/status protocol. |
| WL-0002 | Live workload register | completed | KEX-DOC-WORKLOAD-0001 | WORKLOAD_REGISTER.md | Register exists and records active/completed work. |
| WL-0003 | Inventory seed source file | completed | KEX-LEDGER-INV-0001 | src/data/inventorySeed.ts | Source file exports registered inventory objects. |
| WL-0004 | Workload seed source file | completed | KEX-DOC-WORKLOAD-0001 | src/data/workloadSeed.ts | Source file exports workload records. |
| WL-0005 | Inventory adapter | completed | KEX-LEDGER-INV-0001 | src/lib/adapters/inventoryAdapter.ts | Adapter loads/searches inventory objects. |
| WL-0006 | Workload adapter | completed | KEX-DOC-WORKLOAD-0001 | src/lib/adapters/workloadAdapter.ts | Adapter loads/status-filters workload objects. |
| WL-0007 | Inventory panel | completed | KEX-UI-HYPERDRIVE-0001 | src/components/InventoryPanel.tsx | UI component displays inventory state. |
| WL-0008 | Workload panel | completed | KEX-UI-HYPERDRIVE-0001 | src/components/WorkloadPanel.tsx | UI component displays workload queue. |
| WL-0009 | KEX/BRAINK affect ethics model | completed | KEX-BRAINK-AFFECT-ETHICS-0001 | docs/KEX_BRAINK_AFFECT_ETHICS.md; src/lib/validators.ts; src/lib/validators.test.ts; MANIFEST.json | Model artifact exists, manifest is updated with hashes, executable checker passes tests. |
| WL-0010 | Vitest benchmark/test lane separation | completed | KEX-DOC-WORKLOAD-0001 | vite.config.ts; package.json | Unit test runner excludes benchmark-only files, and benchmark command remains explicit. |
| WL-0011 | KEX HyperDrive instantiation research trajectory | completed | KEX-ARCH-HYPERDRIVE-0001 | docs/KEX_HYPERDRIVE_INSTANTIATION_RESEARCH.md | Deep analysis exists with lanes, software strategies, proof gates, and pending external validation boundaries. |
| WL-0012 | Dashboard workload source alignment | completed | KEX-DOC-WORKLOAD-0001 | src/data/workloadSeed.ts; src/lib/adapters/workloadAdapter.ts | Source workload queue mirrors the active register and supports status summaries. |
| WL-0013 | Dashboard inventory/workload projection | completed | KEX-UI-HYPERDRIVE-0001 | src/components/InventoryPanel.tsx; src/components/WorkloadPanel.tsx; src/App.tsx; src/styles/global.css | UI renders inventory and workload proof state without autonomous/runtime overclaiming. |
| WL-0014 | Mirror lane durable state-transfer actuator | completed | KEX-DEF-MIRROR-0001 | mirror_lane_storage_substrate/runtime/kex_mirror_lane_runtime.py; mirror_lane_storage_substrate/tests/test_kex_mirror_lane_runtime.py | Runtime and qualification test implementation exist for deterministic update/restore, parity, stale cleanup and corruption rejection. Test execution evidence is tracked separately. |
| WL-0015 | Mirror lane governance/control package | completed | KEX-DEF-MIRROR-0001 | mirror_lane_storage_substrate/CONTROL_INDEX.md; mirror_lane_storage_substrate/MIRROR_LANE_COMPONENT_SPEC.json; mirror_lane_storage_substrate/PROCESS_WORKFLOW_CONTROL.md; mirror_lane_storage_substrate/FILING_EVIDENCE_STANDARD.md; mirror_lane_storage_substrate/CROSS_REPO_AUTHORITY_CONTRACT.md | Runtime has explicit ownership, interfaces, process, filing/evidence, rollback, promotion and portability controls. |
| WL-0016 | Mirror lane dependency declaration | completed | KEX-DEF-MIRROR-0001 | dependency-graph/kex-mirror-lane-dependencies.fragment.json | Runtime, host filesystem, qualification and BRAINK consumer edges are machine-readable. |
| WL-0017 | BRAINK logical-computer cross-repository qualification | in_progress | KEX-SCRIPT-MIRROR-0001 | BRAINK PR #69; KEDDEH-CLOUD-SERVERS-ID-1 PR #5 | BRAINK consumes this runtime by exact revision, Host A and Host B evidence lanes execute, and consumer identity/state/lineage/authority invariants are reconciled at the claimed evidence level. |

## Update Rule

When a new workload is identified, add it here before completing the work.

When work starts, set status to `in_progress`.

When a file or test is committed, set status to `completed` only for the implemented artifact. Execution/qualification work remains `in_progress` or `blocked` until observed evidence exists.
