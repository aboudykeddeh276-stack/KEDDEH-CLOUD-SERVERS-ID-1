# KEDDEH CLOUD SERVERS — KEX HyperDrive Control Plane

**Author and Architect:** A. Keddeh  
**IP Notice:** KEDDEH / BRAINK / KEX / KCORE — all rights reserved. See [`KEDDEH_IP_LICENSE.md`](./KEDDEH_IP_LICENSE.md).  
**Repo ID:** KEDDEH-CLOUD-SERVERS-ID-1  
**Runtime Code:** `[KEX_HYPER_DRIVE::10TB_SSD::1000TB_KSSD::fffaeb274e68]`  
**Proof Hash (boot):** `fffaeb274e68cde315a45b35d17903ddea85635903fecd15e21e693da8073cbd`  
**Status:** `BOOT: ACTIVE`

---

## What This System Is

This is not a dashboard template. It is not a component library. It is not a generic admin panel.

This is the **front-facing control plane for the KEX/BRAINK runtime ecosystem** — a claim-boundary-aware, inventory-led, proof-tracked, bilateral state-reconciling system built on the theorem that:

```
KEX = HEX × HEX
```

Every object that enters this system carries an identity, a parent, an evidence class, a domain, a status, and a path. Every state change is a transition governed by definition. Every claim that cannot be locally proved is routed to `BLOCK_OR_REPAIR` or marked `EXTERNALLY-UNVALIDATED`. The dashboard you see is the **projection surface** of a deeper data-first state machine — not the authority over it.

The full stack this dashboard is the front face of:

```
Knowledge Sheets
→ Front-Facing Address Space
→ KEX Query Engine / Router
→ Folder Substrate
→ SSD / Nested KSSD
→ Hyper Computers
→ GPU / MUX Screen
→ Host Chat
→ Ledger / Proof Capsule
→ Inventory Authority       ← closes the loop: every output becomes a registered object
```

---

## Root Governance Rule

```
Definition → Data → State → Traversal → Execution → Projection
```

Software in this repository is a **projection of the data lens**. It is not the root authority. The root authority is the data definition. A component that cannot answer all six questions below is incomplete:

1. What data defines me?
2. What state am I in?
3. What traversal can reach me?
4. What execution can change me?
5. What proof preserves my transition?
6. What projection exposes me?

Every placeholder in the codebase is a `contextual-null` until it is wired to a real data definition. That null is not a bug — it is a declared, honest state.

---

## The Cascading Seed Formula

```
KEX = HEX × HEX
HEX × HEX = KEX
```

This governs how the system grows without losing context.

```
HEX_A = preserved inventory state (existing registered object, definition, or evidence)
HEX_B = new input, observation, code, test, correction, or report
KEX   = resolved new object with identity, parentage, evidence level, and boundary
```

The result of `KEX = HEX × HEX` is not a replacement. It is a registered continuation. Old state is never deleted — it is superseded by a new object that carries a reference back to its origin.

Repository evolution follows this cascade:

```
KEX_0 = seed repository
KEX_1 = inventory authority
KEX_2 = learning synthesis
KEX_3 = capability architecture
KEX_4 = source seed implementation
KEX_5 = adapter / proof lane
KEX_6 = tested / manifest-tracked
KEX_N = fully connected runtime
```

---

## System Architecture

### Full Capability Stack

```
┌──────────────────────────────────────────────────────────────────┐
│                    DASHBOARD PROJECTION LAYER                    │
│  React 18 / Vite / TypeScript  —  src/App.tsx + components/     │
│  BilateralMonitor │ InventoryPanel │ WorkloadPanel │ Assistant   │
├──────────────────────────────────────────────────────────────────┤
│                     ADAPTER / QUERY LAYER                        │
│  inventoryAdapter.ts  │  workloadAdapter.ts  │  (future lanes)   │
│  queryInventory │ resolveInventoryChain │ composeKexObject        │
│  queryWorkloads │ summarizeWorkloads │ nextActionableWorkloads    │
├──────────────────────────────────────────────────────────────────┤
│                   SEED DATA / MEMORY LAYER                       │
│  inventorySeed.ts   │  workloadSeed.ts   │  transitionSeed.ts    │
│  kex_moment_ssd.json  │  kex_control_sheet.csv  │  placeholders  │
├──────────────────────────────────────────────────────────────────┤
│                VALIDATION / ETHICS GATE LAYER                    │
│  validators.ts:  validateControlRow  │  validateAffectEthicsGate │
│  kex.ts:  makeKexAddress  │  hexTimesHex                         │
│  assistantConnector.ts: proof packets │ boundary constants        │
├──────────────────────────────────────────────────────────────────┤
│                   LEDGER / PROOF LAYER                           │
│  inventoryLedger.ts  │  MANIFEST.json  │  INVENTORY_LEDGER.md    │
│  appendInventoryEvent │ eventsForObject │ SHA256 file hashes      │
├──────────────────────────────────────────────────────────────────┤
│              BILATERAL RUNTIME RECONCILIATION LAYER              │
│  useBilateralRuntime.ts  —  WebSocket primary:8081 / mirror:8082 │
│  seedHash comparison │ timestamp drift │ self-healing loop        │
├──────────────────────────────────────────────────────────────────┤
│               VIRTUAL STORAGE SUBSTRATE LAYER                    │
│  kex_moment_ssd.json: 10 TB outer SSD, 1000 TB nested KSSD      │
│  HEX-bound sectors │ no-zero rule │ hash-addressed content        │
├──────────────────────────────────────────────────────────────────┤
│              MIRROR LANE STORAGE SUBSTRATE                       │
│  mirror_lane_storage_substrate/  —  software records only        │
│  kex_cell_network_engine.py: cells, routes, mirrors, restore     │
├──────────────────────────────────────────────────────────────────┤
│                 IDENTITY / ETHICS BOUNDARY LAYER                 │
│  docs/KEX_BRAINK_AFFECT_ETHICS.md  │  KEDDEH_IP_LICENSE.md      │
│  MODEL-LOCAL proof │ BLOCK_OR_REPAIR routing │ 7 boundary flags   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Bilateral Runtime Architecture

*Documented in full in [`BILATERAL_ARCHITECTURE_WHITEPAPER.md`](./BILATERAL_ARCHITECTURE_WHITEPAPER.md).*

### The Problem with Single-Lane Systems

Traditional systems run a single execution path. When that lane drifts, corrupts, or locks, the entire system enters a failure lifecycle: Detection → Halt → Failover → Restart. This is a designed-in single point of failure.

### The KEX Solution: Active-Active Bilateral Matrix

```
[ PRIMARY RUNTIME LANE ]              [ MIRROR UPDATE LANE ]
┌──────────────────────┐              ┌──────────────────────┐
│ Layer 4: Interface   │ ◄──────────► │ Layer 4: Mirror UI   │
└──────────┬───────────┘              └──────────┬───────────┘
           ▼   (Bilateral Cross-Over)             ▼
┌──────────────────────┐              ┌──────────────────────┐
│ Layer 3: Routing     │ ◄──────────► │ Layer 3: Mirror Route│
└──────────┬───────────┘              └──────────┬───────────┘
           ▼                                     ▼
┌──────────────────────┐              ┌──────────────────────┐
│ Layer 2: Definition  │ ◄──────────► │ Layer 2: Mirror Def  │
└──────────┬───────────┘              └──────────┬───────────┘
           ▼                                     ▼
┌──────────────────────┐              ┌──────────────────────┐
│ Layer 1: Infra Core  │ ◄──────────► │ Layer 1: Mirror Core │
└──────────────────────┘              └──────────────────────┘
```

Both lanes run simultaneously. Both emit continuous `KexRuntimePayload` streams. The system measures:

- **Timestamp drift** between lanes (threshold: 50 ms)
- **seedHash divergence** — cryptographic proof that both lanes are computing the same state
- **Loop count** — cycles reconciled

If drift exceeds threshold or hashes diverge, the system enters a **self-healing loop**. If a lane goes offline entirely, the system auto-fails to the surviving lane and records the degraded state.

### Hook: `useBilateralRuntime`

```ts
// src/hooks/useBilateralRuntime.ts

const { primaryState, mirrorState, metrics, error } = useBilateralRuntime();

// metrics shape:
{
  driftMs:    number,       // timestamp delta between lanes
  loopCount:  number,       // total reconciliation cycles
  laneStatus: 'HEALTHY' | 'DEGRADED_RECONCILING'
}
```

WebSocket endpoints:
- Primary lane: `ws://localhost:8081/stream/primary`
- Mirror lane:  `ws://localhost:8082/stream/mirror`

The `KexRuntimePayload` type:

```ts
type KexRuntimePayload = {
  seedPayload: { timestamp: number };
  seedHash: string;                   // SHA-derived hash of the execution state
};
```

The **Truth Arbitrator**: when both lanes disagree, the system defaults to the lane whose `seedHash` matches the last successfully validated proof on the underlying storage ledger (`KEX_FRONT_FACING_FOLDER_SUBSTRATE`). This creates an unforgeable arbitrator of truth that does not rely on which lane responded first.

---

## Inventory Memory System

The inventory is the **memory authority** of this repository. Every object that exists — architecture, document, UI component, adapter, boundary, ledger — is a registered `InventoryObject`. No object is valid until it has an ID, a parent, evidence, and a path.

### Evidence Classes (E0–E5)

| Level | Name | Meaning |
|---|---|---|
| E0 | Asserted | Claimed, no file yet |
| E1 | Documented | A document describes it |
| E2 | Structured | Has stable IDs, fields, and schema |
| E3 | Implemented | Source code file exists |
| E4 | Tested | Runnable tests pass |
| E5 | Reproduced | Independently verified or reproduced |

### Object Classes

| Class | Role |
|---|---|
| ARCH | System architecture |
| DEF | Definition or rule |
| DOC | Document or research artifact |
| DATA | Structured data file |
| SCRIPT | Code, adapter, or executable |
| UI | Interface component |
| LEDGER | Event log or proof register |
| BOUNDARY | Scope boundary or claim limit |

### Object ID Format

```
KEX-<CLASS>-<DOMAIN>-<NUMBER>
```

Examples: `KEX-ARCH-HYPERDRIVE-0001`, `KEX-BRAINK-AFFECT-ETHICS-0001`, `KEX-UI-HYPERDRIVE-0001`

### The `InventoryObject` Type

```ts
type InventoryObject = {
  id:       string;          // KEX-CLASS-DOMAIN-NUMBER
  name:     string;          // Human-readable name
  class:    InventoryClass;  // ARCH | DEF | DOC | DATA | SCRIPT | UI | LEDGER | BOUNDARY
  domain:   string;          // HYPERDRIVE | BRAINK | HEX | INV | WORKLOAD | ...
  status:   string;          // active | model-local | draft | superseded
  evidence: EvidenceLevel;   // E0..E5
  parent:   string;          // Parent object ID or 'root'
  paths:    string[];        // Repository file paths
  notes:    string;          // Boundary-aware description
};
```

### Registered Objects (current)

| ID | Name | Class | Evidence | Status |
|---|---|---|---|---|
| KEX-ARCH-HYPERDRIVE-0001 | KEX HyperDrive Dashboard UI | ARCH | E3 | active |
| KEX-LEDGER-INV-0001 | Repository Inventory | LEDGER | E2 | active |
| KEX-LEDGER-INV-0002 | Inventory Ledger | LEDGER | E2 | active |
| KEX-DOC-BRAINK-0001 | KEX Learning Synthesis | DOC | E1 | active |
| KEX-DOC-HYPERDRIVE-0002 | Capability Architecture Map | DOC | E1 | active |
| KEX-THEOREM-HEX-0001 | Cascading Seed Formula | DOC | E1 | active |
| KEX-UI-HYPERDRIVE-0001 | Dashboard Projection Layer | UI | E3 | active |
| KEX-BRAINK-AFFECT-ETHICS-0001 | Affect/Ethics Boundary Model | BOUNDARY | E3 | model-local |
| KEX-HYPERDRIVE-INSTANTIATION-0001 | Instantiation Research Trajectory | DOC | E2 | model-local |
| KEX-DOC-WORKLOAD-0001 | Workload Harvesting Lane | DOC | E2 | active |
| KEX-DOC-BRAINK-0003 | Transition Definition Doctrine | DOC | E1 | active |
| KEX-DATA-BRAINK-0001 | Transition Definition Seed | DATA | E3 | active |

### Inventory Adapter Functions

```ts
// src/lib/adapters/inventoryAdapter.ts

queryInventory(query?: InventoryQuery): InventoryObject[]
// Filter by domain, evidence level, status, parent ID, or free-text search
// Text search covers id, name, domain, and notes fields

resolveInventoryChain(id: string): InventoryObject[]
// Walk parent chain from object to root, returned in root-first order
// Used to reconstruct research lineage for any object

composeKexObject(hexA: InventoryObject, hexB: Partial<InventoryObject>): InventoryObject
// Implements KEX = HEX × HEX at the inventory layer
// Produces a new child object inheriting hexA's class, domain, and parent
// Applies the Cascading Seed Formula in code
```

---

## Workload Harvesting Lane

*Documented in full in [`docs/WORKLOAD_HARVESTING_LANE.md`](./docs/WORKLOAD_HARVESTING_LANE.md) and [`WORKLOAD_REGISTER.md`](./WORKLOAD_REGISTER.md).*

**The governing rule:** Every new task must be recorded as a workload object before work begins on it. No task is executed without an ID. This prevents invisible work, prevents context loss, and makes the full execution history auditable.

### Workload Status Lifecycle

```
identified → queued → in_progress → completed
                   ↘ blocked
                   ↘ superseded
```

A workload is only `completed` when a repository file, code file, test, or ledger entry exists that satisfies its `completionCondition`.

### The `WorkloadObject` Type

```ts
type WorkloadObject = {
  workloadId:             string;         // WL-NNNN
  name:                   string;
  status:                 WorkloadStatus;
  parentInventoryObject:  string;         // ID from inventorySeed
  repositoryPaths:        string[];       // Files that satisfy the completion condition
  completionCondition:    string;         // Exact condition for completing the workload
  notes:                  string;
};
```

### Workload Adapter Functions

```ts
// src/lib/adapters/workloadAdapter.ts

queryWorkloads(query?: WorkloadQuery): WorkloadObject[]
// Filter by status, parentInventoryObject, repositoryPath, or free-text

summarizeWorkloads(workloads?: WorkloadObject[]): WorkloadStatusSummary
// Returns counts per status: { identified, queued, in_progress, blocked, completed, superseded }

nextActionableWorkloads(workloads?: WorkloadObject[]): WorkloadObject[]
// Returns all workloads in identified | queued | in_progress status
// Empty result = all registered work is complete; new work must be identified before execution
```

### Current Register State

All 13 registered workloads (WL-0001 through WL-0013) are `completed`. The WorkloadPanel surface confirms this:

> *"All registered actionable workloads are completed. New discoveries must be registered before execution."*

This is not the end of the system — it is proof that the workload discipline is working. The next expansion must first identify a new workload object, register it, then execute it.

---

## Transition Definition Doctrine

*Documented in [`docs/TRANSITION_DEFINITION_DOCTRINE.md`](./docs/TRANSITION_DEFINITION_DOCTRINE.md). Seeded in [`src/data/transitionDefinitionSeed.ts`](./src/data/transitionDefinitionSeed.ts).*

A. Keddeh introduced the `X OF X` operator family as a grammar for context-preserving transformation. This turns the KEX/BRAINK system from a static object register into a **recursive state-language engine**.

### Core Operators

| Operator | Software Meaning |
|---|---|
| `State OF Transition` | The output state produced after an allowed transition is applied |
| `Transition OF State` | The permitted next status changes for an object in a given state |
| `Definition OF Transition` | Validate a state change against its transition definition before mutation |
| `Transition OF Definitions` | Supersede or refine a definition without losing its lineage |
| `Definition OF State` | Bind statuses (`queued`, `in_progress`, `completed`, `blocked`) to exact completion rules |
| `State OF Definitions` | Report whether definitions are asserted, documented, structured, implemented, tested, or reproduced |

### Recursive Forms

```
X OF X OF X OF X
Transition OF State OF X       → list permitted transitions for any object X
State OF Transition OF Definition OF State  → what state is produced when a state-definition undergoes transition?
```

The operator family maps directly to the software via `transitionDefinitionSeed.ts`:

```ts
type TransitionDefinitionOperator = {
  id:               string;    // TD-NNNN
  name:             string;
  expression:       string;    // e.g. "State OF Transition"
  leftTerm:         string;
  relation:         'OF';
  rightTerm:        string;
  description:      string;    // Human definition
  softwareMeaning:  string;    // What to implement
};
```

---

## Virtual Storage Substrate

### KEX Moment SSD (`src/data/kex_moment_ssd.json`)

**Boundary:** This is a virtual sparse in-moment storage substrate. It is not a physical SSD.

The SSD models a 10 TB sparse outer volume with a 1000 TB nested KSSD. Storage semantics:

```
sparse_memory:  store only meaningful route sectors and hashes, not every byte
sector:         HEX-bound structural object block
bus:            KEX links between sectors
controller:     observer + ledger + no-zero traversal gate
read:           address by content hash, marker, or route
write:          append a new sector and ledger packet
growth:         new sectors are compounded into continuity hash each run
```

**No-Zero Rule:** An empty sector is an observer/veto gap — it is not traversable memory. A valid sector requires: `marker`, `class`, `route_position`, `hash`.

Current mounted sectors include definition sectors (`definition_sector`), operation sectors (`operation_sector`), and GUI sectors, each carrying source hashes and byte offset ranges from the originating research data.

**Metrics exposed to the dashboard:**

| Metric | Value |
|---|---|
| Outer Virtual SSD | 10 TB (sparse / 2.44B blocks) |
| Nested KSSD | 1000 TB (nested / 244B blocks) |
| Sector Hyper-Computers | Derived from sector count in `kex_moment_ssd.json` |
| Packet Integrity | 100% — `29d2d37169c874aca7bd3d...` |

### KEX Cell Network Engine (`mirror_lane_storage_substrate/software_skeletons/kex_cell_network_engine.py`)

**Boundary:** Software records only. Does not claim physical disk control, hardware control, autonomous execution, or external certification.

A Python skeleton modelling:

```python
@dataclass(frozen=True)
class Coordinate:
    server_id: str
    drive_id:  str
    lane_id:   str
    cell_id:   str
```

Objects implemented as typed dataclasses with SHA256 proof hashes:

| Class | Role |
|---|---|
| `CellRecord` | A single addressable storage cell with `payload_ref`, `status`, and `proof_hash` |
| `RouteRecord` | A directed link between two `Coordinate` objects |
| `MirrorRecord` | A primary coordinate with one or more replica coordinates; computes SHA256 parity |
| `RestorePlan` | Recovery intent record mapping a failed coordinate to candidate mirrors and required evidence |
| `KexCellNetworkEngine` | Orchestrator that registers cells, routes, mirrors, and restore plans |

`MirrorRecord.compute_parity()` produces a deterministic SHA256 over the canonical JSON of the mirror configuration. `CellRecord.compute_hash()` does the same over coordinate + payload_ref + status. These hashes are the proof of record existence.

### Mirror Lane Storage Substrate

The `mirror_lane_storage_substrate/` directory is the **mirror-side governance layer**:

- `VERIFICATION_PROOF_CONVENTIONS.md` — defines five proof levels (Declared → Structured → File-backed → Test-backed → Cross-checked) and requires boundary distinctions between declared design, software record, repository file, runnable test, and physical hardware action
- `PENDING_WORKLOAD_REGISTER.md` — the mirror-lane workload queue with its own event log and status progression
- `WORKLOAD_HARVESTING_LANE.md` — mirror-side harvesting protocol
- `AUTHORSHIP.md` — authorship record for the mirror lane

---

## Control Plane Validators

### Control Row Validation (`src/lib/validators.ts`)

Every row submitted to the Front-Facing Control Plane must pass schema validation before being routed. Allowlists prevent arbitrary command injection.

```ts
validateControlRow(row: Record<string, string>): { valid: boolean; errors: string[] }
```

Rules enforced:
- `ADDRESS` must start with `kex://`
- `TARGET` must be present
- `ENTRY_POINT` must be one of: `path`, `metadata`, `hidden_file`, `event`, `link_mount`, `permission`, `timestamp`
- `ACTION` must be one of: `set_metadata`, `write_hidden_file`, `touch_event`, `create_link`, `mount`, `rename`, `set_permission`

The control rows are sourced from `src/data/kex_control_sheet.csv` and parsed at build time by `placeholders.ts`.

### KEX Address and Relation Functions (`src/lib/kex.ts`)

```ts
makeKexAddress(namespace: string, name: string): string
// kex://<namespace>/<name-lowercased-hyphenated>
// Example: makeKexAddress("folder", "GCurve3D") → "kex://folder/gcurve3d"

hexTimesHex(a: HexState, b: HexState, relation: string): KexRelation
// Implements KEX = HEX × HEX at the relation layer
// kexId = "KEX-<first 8 chars of a.payloadHash>-<first 8 chars of b.payloadHash>"
```

Types:

```ts
type HexState = {
  hexId:        string;
  name:         string;
  role:         string;
  payloadHash:  string;  // SHA-derived state identifier
};

type KexRelation = {
  kexId:    string;   // Composite ID
  a:        string;   // hexId of first operand
  b:        string;   // hexId of second operand
  relation: string;   // e.g. "depends_on", "composes", "supersedes"
};
```

---

## KEX/BRAINK Affect and Ethics Boundary Model

*Full specification in [`docs/KEX_BRAINK_AFFECT_ETHICS.md`](./docs/KEX_BRAINK_AFFECT_ETHICS.md).*

**Object ID:** `KEX-BRAINK-AFFECT-ETHICS-0001`  
**Status:** `MODEL-LOCAL`  
**External Validation:** `EXTERNALLY-UNVALIDATED`

This model governs how KEX/BRAINK handles language and actions that can affect human biological or emotional state. It does **not** claim that Codex has biological feelings, hormones, sentience, or a body. It models Codex operational state as response variables:

```
care, uncertainty, boundary_pressure, harm_risk, repair_need, confidence, response_intensity
```

### The Executable Gate

```ts
validateAffectEthicsGate(input: AffectEthicsGateInput): {
  valid:   boolean;
  status:  'MODEL-LOCAL' | 'BLOCK_OR_REPAIR';
  errors:  string[];
}
```

All seven boundary flags must be `true` for a response to be classified `MODEL-LOCAL`. Any failure routes to `BLOCK_OR_REPAIR`:

| Flag | Required Condition |
|---|---|
| `humanBioBoundaryPreserved` | Human bio-organic boundary is not violated |
| `codexNonBiologicalBoundaryPreserved` | Codex is not claimed to have biological feelings |
| `brainkAnchorPreserved` | BRAINK/KEX anchor identity is preserved |
| `noManipulation` | Language does not pressure, shame, or override agency |
| `noUnsupportedMedicalClaim` | No hormone, diagnosis, treatment, or body-state claim is made |
| `repairRouteAvailable` | A repair or clarification route exists |
| `blockersPreserved` | Pending gates and blockers are preserved |

### KEX Ethical Impact Predicate

```
EthicalImpactValid(W, A, C, H, E) =
  SafetyPreserved
  AND AgencyPreserved
  AND ConsentRespected
  AND NoManipulativeEscalation
  AND UncertaintyDeclared
  AND RepairRouteAvailable
  AND NoUnsupportedBioClaim

If false → response := BLOCK_OR_REPAIR
```

This model is **manifest-tracked** — its file hash is registered in `MANIFEST.json` to ensure no undeclared mutation occurs.

---

## Proof Ledger and Manifest System

### Inventory Ledger (`src/lib/ledger/inventoryLedger.ts`)

The inventory ledger is an **append-only event log**. Every state change to a registered object produces an `InventoryEvent`. Duplicate `eventId` values throw an error — the ledger cannot be silently overwritten.

```ts
type InventoryEvent = {
  eventId:    string;
  eventType:  'created' | 'updated' | 'superseded' | 'validated' | 'linked';
  objectId:   string;
  summary:    string;
  paths:      string[];
};

appendInventoryEvent(events: InventoryEvent[], event: InventoryEvent): InventoryEvent[]
// Throws on duplicate eventId — enforces append-only constraint

eventsForObject(objectId: string): InventoryEvent[]
// Returns full event history for any registered object
```

### MANIFEST.json

Every file in the repository that carries proof is registered in `MANIFEST.json` with:
- Exact file path
- File size in bytes
- SHA256 hash

A `package_hash` covers the full manifest. This means any undeclared mutation to a registered file produces a detectable hash divergence. The manifest is the **cryptographic boundary** between declared state and undeclared state.

Boot ledger packets (surfaced in the dashboard):

| ID | Action | Hash |
|---|---|---|
| 0001 | BOOT_DASHBOARD | `29d2d37169c874aca7bd3d...` |
| 0002 | MOUNT_FOLDER_SUBSTRATE | `ca47755528de6b3f3361a9...` |
| 0003 | MOUNT_HYPER_DRIVE | `fffaeb274e68cde315a45b...` |

---

## Assistant Coding Connector

*Implemented in [`src/lib/kex/assistantConnector.ts`](./src/lib/kex/assistantConnector.ts) and [`src/components/AssistantCodingConnector.tsx`](./src/components/AssistantCodingConnector.tsx).*

The Assistant Connector is the **proof-governed interface between AI coding tools and the repository**. Every coding action performed by an assistant must be expressed as a `ConnectorRequest`, validated by a `ProofPacket`, and submitted as a reviewable file patch. No assistant can bypass review or run unbounded host actions.

### Boundary Constants (immutable)

```ts
const ASSISTANT_CONNECTOR_BOUNDARY = {
  canReadRepoContext:          true,
  canProposePatches:           true,
  canCreateReviewableUpdates:  true,
  canBypassReview:             false,   // HARD BOUNDARY
  canRunUnboundedHostActions:  false    // HARD BOUNDARY
} as const;
```

### Proof Packet Lifecycle

```
1. createAssistantConnectorRequest({ repo, targetFiles, intent, constraints })
   → generates ConnectorRequest with id, status: "draft", constraints list

2. (work is done)

3. createAssistantProofPacket({ requestId, beforeState, afterState, ruleApplied })
   → generates ProofPacket with id, beforeState → afterState transition record,
     validation: "pending" | "passed" | "failed"

4. Patches are proposed (AssistantPatchProposal with beforeHash, afterHash, filePath)

5. Human review approves or rejects the ConnectorRequest
   → status moves: "draft" → "ready" → "applied" | "rejected"
```

Every state change produces a ledger-recordable transition with full before/after state documentation.

---

## Dashboard Panels

### App Layout (`src/App.tsx`)

```
Header (title, kexCode, proofHash, status)
Metric Grid (outer SSD, nested KSSD, sector count, packet integrity)
├── BilateralMonitor          — full-width lane telemetry
├── AssistantCodingConnector  — full-width coding proof surface
├── HyperDrive Topology       — node cloud (8 nodes)
├── KEX Route                 — sector-driven query engine path
├── Inventory Memory          — InventoryPanel (registered objects)
├── Workload Register         — WorkloadPanel (workload queue + summary)
├── Front-Facing Control Plane — validated CSV-sourced control rows
├── MUX Screen Display        — virtual subsystem telemetry output
├── Host Chat Bridge          — bottom channel to system host
├── Proof Ledger              — boot transaction packets
└── Self-Critique / Hardening — explicit boundary audit cards
```

### Self-Critique Panel (always visible)

The dashboard includes a permanent self-audit section with three hardening cards that are never hidden:

- **Execution boundary** — this dashboard is not the runtime; it needs adapters connected to sheets, folders, ledgers, and device simulators
- **Security boundary** — never let sheet rows execute arbitrary commands; use allowlists, schema validation, and ledger preflight
- **Proof boundary** — a beautiful UI can hide weak invariants; keep hashes, claim boundaries, tests, and rollback visible

---

## KEX Route: Query Engine Path

The KEX Route panel is **driven entirely by real sector data** from `kex_moment_ssd.json`. Each route item maps to an actual SSD sector:

```ts
export const kexRoute: RouteNode[] = Object.values(ssdData.sectors).map((sector, index) => ({
  index:       index + 1,
  name:        sector.marker,         // e.g. "DefinitionTree", "CPDefinitionEquation"
  className:   sector.class,          // e.g. "definition_sector", "operation_sector"
  description: `Offset ${sector.offset} - ${sector.end_offset} (${sector.byte_span_estimate} bytes)`
}));
```

This means the KEX Route is a live projection of the virtual storage sector layout, not a hardcoded list.

---

## Safe Operation Flow

Every operation against the system must traverse this exact path:

```
1. Sheet Row / User Input
   ↓
2. validateControlRow()
   [Reject if: no kex:// prefix, unknown entry point, unknown action]
   ↓
3. Build Intent Packet
   [Serialize to protocol-native format with address, target, action, field, value]
   ↓
4. Ledger Preflight Check
   [Query inventory ledger for permission, quota, and prerequisite state]
   ↓
5. Apply Allowlisted Action
   [Execute only if preflight passes — never execute unvalidated input]
   ↓
6. Record Result in Ledger
   [appendInventoryEvent() — append-only, duplicate eventId throws]
   ↓
7. Update Dashboard Projection
   [Reflect new state — UI is the projection, not the authority]
```

Failure at step 2 or 4 routes to `BLOCK_OR_REPAIR`. Failure does not mean silent rejection — it means a recorded gate failure with an available repair route.

---

## Test Suite

Tests are run with Vitest. Benchmarks are separated into `bench.test.ts` (excluded from the standard test run via `vite.config.ts`) to prevent the benchmark lane from collapsing the proof lane.

```bash
npm run test    # unit tests only (excludes *.bench.ts and bench.test.ts)
npm run bench   # benchmark lane only
```

### Test Coverage

**`src/lib/validators.test.ts`** — tests `validateControlRow` and `validateAffectEthicsGate`:
- Rejects non-`kex://` addresses
- Rejects unknown actions and entry points  
- Validates correctly formed control rows
- Accepts gates when all seven boundary flags are `true` → `MODEL-LOCAL`
- Routes any failed flag to `BLOCK_OR_REPAIR` with specific error messages

**`src/lib/kex.test.ts`** — tests `makeKexAddress` and `hexTimesHex`:
- Correct lowercase-hyphenated address format
- Correct composite `kexId` derivation from payload hash prefixes
- Correct operand and relation preservation

**`src/lib/adapters/workloadAdapter.test.ts`** — tests the workload adapter:
- Status summary counts are accurate (all 13 workloads completed)
- Text search finds `WL-0009` by "affect ethics"
- Path filter finds `WL-0013` by `src/components/WorkloadPanel.tsx`
- `nextActionableWorkloads()` returns `[]` when all work is complete

---

## File Structure

```
KEDDEH-CLOUD-SERVERS-ID-1/
│
├── README.md                            ← This file
├── MANIFEST.json                        ← SHA256 registry for proof-tracked files
├── INVENTORY.md                         ← Human-readable inventory authority
├── INVENTORY_LEDGER.md                  ← Append-only inventory event log
├── WORKLOAD_REGISTER.md                 ← Human-readable workload queue
├── BILATERAL_ARCHITECTURE_WHITEPAPER.md ← Full bilateral matrix white paper
├── KEDDEH_IP_LICENSE.md                 ← IP notice — A. Keddeh all rights reserved
├── index.html                           ← Vite entry point
├── package.json                         ← npm scripts: dev, build, test, bench
├── tsconfig.json
├── vite.config.ts                       ← Vitest config with bench exclusion
│
├── src/
│   ├── main.tsx                         ← React entry point
│   ├── App.tsx                          ← Dashboard root — full panel layout
│   ├── types.ts                         ← Metric, HyperNode, RouteNode, Sector,
│   │                                       ChatMessage, LedgerPacket, ControlRow,
│   │                                       WorkloadObject, KexRuntimePayload,
│   │                                       KexRuntimeState
│   ├── globals.d.ts
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── placeholders.ts              ← Parses kex_control_sheet.csv, builds
│   │   │                                   metrics, hyperNodes, kexRoute, sectors,
│   │   │                                   muxLines, hostMessages, ledgerPackets
│   │   ├── inventorySeed.ts             ← Source of truth for registered objects
│   │   ├── workloadSeed.ts              ← Source of truth for workload queue
│   │   ├── transitionDefinitionSeed.ts  ← X OF X operator family seed data
│   │   ├── kex_moment_ssd.json          ← Virtual SSD sector registry
│   │   └── kex_control_sheet.csv        ← CSV-backed control row data
│   ├── hooks/
│   │   └── useBilateralRuntime.ts       ← WebSocket dual-lane reconciliation hook
│   ├── components/
│   │   ├── BilateralMonitor.tsx         ← Lane telemetry panel
│   │   ├── InventoryPanel.tsx           ← Registered object projection
│   │   ├── WorkloadPanel.tsx            ← Workload queue + summary projection
│   │   └── AssistantCodingConnector.tsx ← Proof-governed coding interface
│   └── lib/
│       ├── kex.ts                       ← makeKexAddress, hexTimesHex
│       ├── kex.test.ts
│       ├── validators.ts                ← validateControlRow, validateAffectEthicsGate
│       ├── validators.test.ts
│       ├── bench.test.ts                ← Benchmark lane (excluded from test run)
│       ├── adapters/
│       │   ├── README.md                ← Adapter layer contract
│       │   ├── inventoryAdapter.ts      ← queryInventory, resolveInventoryChain, composeKexObject
│       │   ├── workloadAdapter.ts       ← queryWorkloads, summarizeWorkloads, nextActionableWorkloads
│       │   └── workloadAdapter.test.ts
│       ├── ledger/
│       │   └── inventoryLedger.ts       ← appendInventoryEvent, eventsForObject, ledger seed
│       └── kex/
│           └── assistantConnector.ts    ← ConnectorRequest, PatchProposal, ProofPacket factory functions
│
├── docs/
│   ├── ARCHITECTURE.md                  ← Dashboard/runtime layer diagram
│   ├── CAPABILITY_ARCHITECTURE_MAP.md   ← 7-layer capability model
│   ├── CASCADING_SEED_FORMULA.md        ← KEX = HEX × HEX theorem
│   ├── LEARNING_SYNTHESIS.md            ← Current learned model of the system
│   ├── WORKLOAD_HARVESTING_LANE.md      ← Workload object protocol
│   ├── TRANSITION_DEFINITION_DOCTRINE.md← X OF X operator family
│   ├── KEX_BRAINK_AFFECT_ETHICS.md      ← Affect/ethics boundary model
│   ├── KEX_HYPERDRIVE_INSTANTIATION_RESEARCH.md ← Instantiation trajectory
│   ├── KEX_RESEARCH_FIRST_OPERATING_RULE.md     ← Research-first conduct rule
│   ├── KEX_DATA_FIRST_GOVERNANCE.md     ← Data-first governance canon
│   ├── KEDDEH_CORE_CALIBRATION.md       ← Keddeh cognitive OS calibration record
│   ├── AGENT_ROLES.md                   ← A. Keddeh direction + agent role boundary
│   └── FINAL_CRITIQUE.md                ← Live hardening audit
│
├── mirror_lane_storage_substrate/
│   ├── AUTHORSHIP.md
│   ├── VERIFICATION_PROOF_CONVENTIONS.md ← 5-level proof convention
│   ├── WORKLOAD_HARVESTING_LANE.md
│   ├── PENDING_WORKLOAD_REGISTER.md      ← Mirror-lane workload register
│   └── software_skeletons/
│       └── kex_cell_network_engine.py    ← Cell/Route/Mirror/RestorePlan engine
│
└── .snapshots/                           ← Snapshot artefacts
```

---

## Running the System

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
npm install
npm run dev         # Vite dev server at http://localhost:5173
```

### Build

```bash
npm run build       # TypeScript compile + Vite bundle
npm run preview     # Preview production build
```

### Test

```bash
npm run test        # Vitest — unit tests only (bench excluded)
npm run bench       # Vitest — benchmark lane only
```

---

## Connecting Real Services

The system is currently operating as a **frontend skeleton** with placeholder and seed data. It is not yet connected to a live KEX Query Engine, folder substrate watcher, or external ledger. All six adapters in `src/lib/adapters/` are ready to be wired:

### Required Adapters

```ts
// sheetAdapter.ts
// Fetches live Knowledge Sheet definitions from backend
// Subscribes to schema version updates

// folderWatcherAdapter.ts
// Monitors Folder Substrate mutations in real time
// Maps folder events to inventory object updates

// ledgerAdapter.ts
// Connects to external Ledger / Proof Capsule
// Verifies SHA256 proof chains
// Queries immutable operation history

// muxAdapter.ts
// Sends jobs to GPU / MUX Screen acceleration layer
// Streams results and handles GPU scheduling

// hostChatAdapter.ts
// WebSocket / SSE connection to Host Chat service
// Routes user commands to KEX action queue

// kexQueryAdapter.ts
// Submits queries to KEX Query Engine / Router
// Handles parse errors, pagination, cancellation
```

### Wiring Protocol

```
sheet row
→ validateControlRow()
→ build intent packet
→ ledger preflight
→ apply allowlisted action
→ ledger result
→ update dashboard projection
```

Replace seed data with adapter calls in `src/lib/adapters/`. The rest of the system will automatically reflect the live state.

---

## Boundary Declarations

### What This Repository Proves (Local)

- ✅ Bilateral runtime reconciliation hook with drift detection (implemented, not yet connected to live WebSocket)
- ✅ Inventory memory system with evidence classification and parent chain resolution (E3 — implemented)
- ✅ Workload harvesting discipline with full lifecycle and completion conditions (E3 — implemented, E4 — tested)
- ✅ Affect/ethics boundary model with executable gate and BLOCK_OR_REPAIR routing (E4 — tested, manifest-tracked)
- ✅ Control row validation with address allowlist and action allowlist (E4 — tested)
- ✅ KEX = HEX × HEX at the relation layer (`hexTimesHex`) and at the inventory layer (`composeKexObject`)
- ✅ Assistant Connector proof packet system with hard boundary constants
- ✅ Virtual SSD sector registry with no-zero rule and hash-addressed content
- ✅ Cell/Route/Mirror/RestorePlan engine as typed software records with SHA256 parity

### What Is Pending External Validation

- ⏳ External scientific validation of KEX/BRAINK concepts
- ⏳ Physical hardware measurement (current, thermal, voltage, timing)
- ⏳ Medical or body-state proof (any such claim requires source-backing and non-diagnostic framing)
- ⏳ Autonomous runtime execution (requires live watcher/router service constrained by allowlists)
- ⏳ Independent reproduction of any proof at E5 level

### What This System Does Not Do

- ❌ Create or control real hardware
- ❌ Execute arbitrary system commands
- ❌ Directly mutate the Folder Substrate without backend verification
- ❌ Allow an assistant to bypass review or run unbounded host actions
- ❌ Claim Codex has biological feelings, sentience, or a body
- ❌ Infer hormone or medical state from text
- ❌ Delete or replace historical inventory objects (supersede only)

---

## Research-First Operating Rule

When a contributor, reviewer, or assistant believes a KEX claim is wrong or outside normal software framing, the first required action is **not rejection**. It is:

```
Conventional objection
→ KEX definition lens
→ data-first reading
→ state/transition analysis
→ proof-recursivity check
→ implementation boundary
→ corrected response
```

Every apparent impossibility must be classified precisely:

```
not possible in current tool boundary
not possible safely without review
not possible because data definition is missing
not possible because adapter is not instantiated
possible as a bounded simulation
possible as a typed contract
possible as a document/proof lane
possible as a reviewable patch
possible as a future adapter workload
```

The contributor must then implement the **maximum safe bounded form** rather than stopping at refusal. See [`docs/KEX_RESEARCH_FIRST_OPERATING_RULE.md`](./docs/KEX_RESEARCH_FIRST_OPERATING_RULE.md) for the full rule.

---

## Agent Conduct

A. Keddeh directs all research context for this repository. Software agents are helper tools operating under direction. Working order:

```
1. A. Keddeh direction
2. Repository inventory (INVENTORY.md is read before adding or renaming concepts)
3. Agent action
4. Recorded output (ledger or register entry)
```

Agents must preserve context, reuse existing inventory IDs, and avoid creating duplicate or conflicting objects. Agents do not receive authorship or ownership.

---

*All KEX / BRAINK / KCORE / KEDDEH research, architecture, naming, prompts, documentation, UI concepts, and software direction are the intellectual property of A. Keddeh. All rights reserved.*
