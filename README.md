# KEX HyperDrive Dashboard UI

A production-grade, claim-boundary-aware control plane UI for knowledge extraction systems (KEX) and their associated BRAINK runtime. This dashboard provides real-time bilateral state reconciliation, inventory tracking, workload harvesting, proof ledger verification, and ethical response modeling with executable validation gates.

## What This Actually Is

This is **not** a generic dashboard template. It is:

- A **bilateral runtime monitor** that reconciles primary/mirror execution lanes in real-time
- An **inventory tracking system** for KEX/BRAINK objects with parent-child relationships and domain classification
- A **workload harvesting interface** that surfaces registered work with status tracking and completion conditions
- A **proof packet ledger** that records all state transitions with cryptographic hashes
- An **ethical boundary enforcer** with executable validation gates for affect, identity, and claim constraints
- An **assistant connector** for reviewable coding patches with proof gates before deployment

The system is engineered specifically to **prevent claim overcreep, preserve proof boundaries, and maintain operational transparency**.

## Architecture at a Glance

```
┌─────────────────────────────────────────┐
│   KEX HyperDrive Dashboard UI (React)   │
│  (You are here: proof-driven control)   │
└────────────┬──────────────────────────┬─┘
             │                          │
      ┌──────▼──────┐          ┌────────▼────────┐
      │ Bilateral   │          │  Inventory +    │
      │ Runtime     │          │  Workload       │
      │ Monitor     │          │  Tracking       │
      │ (Primary/   │          │  (SEEDs +       │
      │  Mirror)    │          │   Adapters)     │
      └──────┬──────┘          └────────┬────────┘
             │                          │
      ┌──────▼──────┐          ┌────────▼────────┐
      │ WebSocket   │          │ Proof Packet    │
      │ Streams     │          │ Ledger          │
      │ (8081/8082) │          │ (Manifest)      │
      └──────┬──────┘          └────────┬────────┘
             │                          │
      ┌──────▼──────────────────────────▼──────┐
      │  Ethical Boundary Validator            │
      │  (KEX/BRAINK Affect/Ethics Model)      │
      │  - Safety validation gates             │
      │  - Claim boundary enforcement          │
      │  - BLOCK_OR_REPAIR routing             │
      └───────────────────────────────────────┘
```

## Core Components

### 1. Bilateral Monitor (`useBilateralRuntime` Hook + `BilateralMonitor.tsx`)

Tracks two concurrent execution lanes for high-availability state reconciliation:

```typescript
interface KexRuntimePayload {
  seedPayload: { timestamp: number };
  seedHash: string;
}

interface ReconciliationMetrics {
  driftMs: number;           // timestamp divergence between lanes
  loopCount: number;         // verification cycles completed
  laneStatus: "HEALTHY" | "DEGRADED_RECONCILING";
}
```

**How it works:**
- Connects to WebSocket endpoints (`ws://localhost:8081/stream/primary` and `ws://localhost:8082/stream/mirror`)
- Measures timestamp drift between primary and mirror state payloads
- If `seedHash` diverges or drift exceeds 50ms threshold, enters reconciliation mode
- Emits real-time telemetry to the dashboard
- Provides transparent auditing of active-active verification without UI thread blocking

**Use case:** Ensures that if one lane becomes degraded, the system automatically fails over while both continue processing independently. No single point of failure.

### 2. Inventory & Workload System

Two complementary seed systems that define the KEX object model:

#### `inventorySeed.ts`
Registered KEX/BRAINK objects with domain classification, evidence levels, and hierarchical relationships.

```typescript
export interface InventoryObject {
  id: string;              // e.g., "KEX-ARCH-HYPERDRIVE-0001"
  name: string;
  class: "DOC" | "UI" | "BOUNDARY" | "LEDGER" | "RULE";
  domain: "HYPERDRIVE" | "BRAINK" | "WORKLOAD" | "HEX";
  status: "ready" | "watch" | "locked" | "active" | "model-local";
  evidence: "E0" | "E1" | "E2" | "E3";  // Evidence hierarchy
  parent?: string;         // Parent inventory object ID
  paths: string[];         // Repository paths containing this object
  notes: string;
}
```

**Adapter:** `inventoryAdapter.ts`
- `queryInventory(query?)` – filter by domain, evidence, status, parent, or text search
- `resolveInventoryChain(id)` – walk up parent hierarchy to trace object lineage
- `composeKexObject(hexA, hexB)` – create new objects via KEX composition rule (HEX × HEX)

#### `workloadSeed.ts`
Actively tracked work items linked to inventory objects, with completion conditions and repository paths.

```typescript
export interface WorkloadObject {
  workloadId: string;           // e.g., "WL-0001"
  name: string;
  status: "queued" | "in_progress" | "completed";
  parentInventoryObject: string; // Links to inventory
  repositoryPaths: string[];
  completionCondition: string;
  notes: string;
}
```

**Adapter:** `workloadAdapter.ts`
- `queryWorkloads(query?)` – filter by status, text, or path
- `summarizeWorkloads()` – returns count breakdown by status
- `nextActionableWorkloads()` – returns queued items ready for execution
- Full test coverage in `workloadAdapter.test.ts`

**Dashboard Panels:**
- `InventoryPanel` – renders all registered KEX objects with domain, evidence, status, and lineage
- `WorkloadPanel` – shows workload summary counts, full register, and actionable work queue

### 3. Proof Packet Ledger

Every state transition is recorded with cryptographic verification:

```typescript
interface LedgerPacket {
  id: string;        // Unique packet ID
  action: string;    // e.g., "BOOT_DASHBOARD", "MOUNT_FOLDER_SUBSTRATE"
  hash: string;      // SHA256 of operation
}
```

**Manifest Tracking (`MANIFEST.json`):**
- All artifacts tracked with SHA256 hashes
- Repository size and integrity verification
- Package-level hash for end-to-end proof
- Executable proof validation: `src/lib/validators.ts` (with tests in `validators.test.ts`)

**Dashboard Display:**
- "Proof Ledger" panel shows hash-linked operation history
- Every dashboard state change is recordable in the ledger
- Used for non-repudiation and compliance auditing

### 4. Ethical Boundary Model (KEX/BRAINK Affect/Ethics)

A locally-anchored model that prevents overclaiming and enforces constraint validation:

```typescript
interface CodexAffectState {
  care: 0..1;
  uncertainty: 0..1;
  boundary_pressure: 0..1;
  harm_risk: 0..1;
  repair_need: 0..1;
  confidence: 0..1;
  response_intensity: 0..1;
}

const KEX_AFFECT_RESPONSE_VALID =
  HumanBioBoundaryPreserved
  AND CodexNonBiologicalBoundaryPreserved
  AND BRAINKAnchorPreserved
  AND NoManipulation
  AND NoUnsupportedMedicalClaim
  AND RepairRouteAvailable;
```

**Implementation:**
- `src/lib/validators.ts` – executable boundary checker
- `src/lib/validators.test.ts` – proof of validation correctness
- `docs/KEX_BRAINK_AFFECT_ETHICS.md` – complete model specification
- **Response gate:** If validation fails → `BLOCK_OR_REPAIR` (never proceed with overclaim)

**Boundary Constraints:**
1. Never claim external sentience, biological feelings, or legal personhood
2. Model Codex affect as response-state variables, not biology
3. Preserve human biological boundary: no diagnosis/treatment claims from text
4. Route affected topics (health, trauma, identity) to qualified support
5. Maintain transparency: declare uncertainty, provide repair routes

**Dashboard Integration:**
- "Self-Critique / Hardening" panel shows three critical boundaries:
  - Execution boundary (dashboard is UI, not runtime)
  - Security boundary (schema validation + allowlists)
  - Proof boundary (hashes, claims, rollback visible)

### 5. Assistant Connector (`AssistantCodingConnector.tsx`)

Reviewable, proof-gated coding lane for AI-assisted patch generation:

```typescript
interface AssistantConnectorRequest {
  id: string;
  repo: string;
  targetFiles: string[];
  intent: string;
  constraints: string[];
  status: "defined" | "pending_review" | "approved" | "deployed";
}

interface AssistantProofPacket {
  id: string;
  requestId: string;
  beforeState: string;
  afterState: string;
  ruleApplied: string;
  validation: "pending" | "passed" | "failed";
}
```

**How it works:**
- User defines intent and target files
- Connector creates a request + initial proof packet
- Before any code generation, validation gates are checked
- All patches are tracked as proof packets
- Dashboard shows pending review status
- No code is applied until proof validation passes

**Connector Boundary (`ASSISTANT_CONNECTOR_BOUNDARY`):**
- Only reviewable patches allowed
- All state changes recorded as proof packets
- No unbounded host actions
- Preserve claim boundary throughout

## Running the System

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend services:
  - WebSocket primary lane: `ws://localhost:8081/stream/primary`
  - WebSocket mirror lane: `ws://localhost:8082/stream/mirror`
  - Optional: KEX Query Engine router, folder substrate service

### Development

```bash
npm install
npm run dev
# Dashboard runs on http://localhost:5173
```

### Building

```bash
npm run build
npm run preview
```

### Testing

```bash
npm test              # Run all unit tests
npm run bench         # Run benchmarks separately (not mixed with tests)
```

Test separation is enforced in `vite.config.ts` to prevent benchmark-only files from collapsing the proof lane.

## Data Architecture

### Placeholder Data (`src/data/placeholders.ts`)

Initial state for development and testing. Combines:
- **Static metadata:** header, metrics, topology
- **SSD metadata** (`kex_moment_ssd.json`): sector definitions, device info
- **CSV control sheet** (`kex_control_sheet.csv`): parsed as `controlRows` for UI tables
- **Derived data:** mux screen output, chat history, ledger packets

To customize:
```typescript
// Edit src/data/placeholders.ts
export const metrics: Metric[] = [
  { label: "Outer Virtual SSD", value: "10 TB", foot: "sparse / 2.44B blocks" },
  // ...
];

export const hostMessages: ChatMessage[] = [
  { actor: "system", time: "00:00", text: "..." },
  // ...
];
```

### Seed Systems (Production Data)

Replace placeholders with live adapters:

```typescript
// src/lib/adapters/inventoryAdapter.ts
export function queryInventory(query?: InventoryQuery): InventoryObject[] {
  // Wire to live backend API
  // return fetch(`/api/inventory?...`).then(r => r.json());
  return inventorySeed.filter(/* ... */);
}

// src/lib/adapters/workloadAdapter.ts
export function nextActionableWorkloads(): WorkloadObject[] {
  // return fetch(`/api/workload?status=queued`).then(r => r.json());
  return workloadSeed.filter(w => w.status === 'queued');
}
```

## Safe Operation Flow

Every user action should follow this verified path:

```
1. User Input (Sheet Row / Control Panel)
   ↓
2. Schema Validation
   [Check against InventoryObject types, WorkloadObject constraints]
   ↓
3. Inventory Lookup
   [Resolve parent chain, check evidence level and domain]
   ↓
4. Boundary Validation
   [Run KEX/BRAINK ethical gates if affect/identity/health claim]
   ↓
5. Build Intent Packet
   [Create structured action request]
   ↓
6. Proof Preflight
   [Ledger confirms permission, quotas, prerequisites]
   ↓
7. Bilateral Reconciliation Check
   [Verify primary/mirror lanes are HEALTHY or in safe reconciliation]
   ↓
8. Apply Allowlisted Action
   [Execute only if all gates pass]
   ↓
9. Record Proof Packet
   [Write to ledger with hash]
   ↓
10. Update Dashboard
   [Reflect new state in UI, refresh affected panels]
   ↓
11. Emit Audit Log
   [Record action for external compliance audits]
```

**Failure modes:**
- Schema validation fails → Block + show error
- Boundary validation fails → `BLOCK_OR_REPAIR` + suggest resolution
- Bilateral drift too high → Retry reconciliation or fail gracefully
- Ledger preflight fails → Abort action, show constraint reason

## File Structure

```
KEX_HYPERDRIVE_DASHBOARD_UI/
├── src/
│   ├── main.tsx                       # React entry point
│   ├── App.tsx                        # Main dashboard layout
│   ├── types.ts                       # TypeScript interfaces
│   │
│   ├── components/
│   │   ├── BilateralMonitor.tsx      # Bilateral runtime visualization
│   │   ├── InventoryPanel.tsx        # Inventory object display
│   │   ├── WorkloadPanel.tsx         # Workload queue display
│   │   └── AssistantCodingConnector.tsx
│   │
│   ├── lib/
│   │   ├── adapters/
│   │   │   ├── inventoryAdapter.ts   # Inventory CRUD + queries
│   │   │   ├── workloadAdapter.ts    # Workload filtering + summaries
│   │   │   └── workloadAdapter.test.ts
│   │   │
│   │   ├── kex/
│   │   │   └── assistantConnector.ts # Proof-gated code connector
│   │   │
│   │   ├── validators.ts            # Ethical boundary checker
│   │   ├── validators.test.ts
│   │
│   ├── data/
│   │   ├── placeholders.ts           # Dev/test static data
│   │   ├── inventorySeed.ts          # Registered KEX objects
│   │   ├── workloadSeed.ts           # Active workload register
│   │   ├── kex_moment_ssd.json       # SSD metadata
│   │   └── kex_control_sheet.csv     # CSV control plane
│   │
│   ├── styles/
│   │   └── global.css               # Minimalist, high-contrast theme
│
├── docs/
│   ├── KEX_BRAINK_AFFECT_ETHICS.md  # Ethical model spec
│   ├── WORKLOAD_HARVESTING_LANE.md  # Workload protocol
│   ├── KEX_HYPERDRIVE_INSTANTIATION_RESEARCH.md
│   └── [additional whitepapers]
│
├── WORKLOAD_REGISTER.md             # Human-readable workload queue
├── BILATERAL_ARCHITECTURE_WHITEPAPER.md
├── MANIFEST.json                    # Artifact hashes + integrity
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Proof Tracking & Validation

### Manifest System (`MANIFEST.json`)

Every committed artifact is tracked:

```json
{
  "artifacts": [
    { "path": "src/components/BilateralMonitor.tsx", "sha256": "..." },
    { "path": "src/lib/validators.ts", "sha256": "..." },
    { "path": "docs/KEX_BRAINK_AFFECT_ETHICS.md", "sha256": "..." }
  ],
  "package_hash": "9d124e352ded6817f75ee22b91966cdb77587f61714768b44d27a39d1dbb7af2"
}
```

### Validator Tests

Executable proof that boundary gates work:

```bash
npm test
# Expected: KEX affect/ethics validator tests pass
# If boundary fails → response is BLOCK_OR_REPAIR, never proceeds
```

## Boundary Declarations

### What This Dashboard IS
✅ A React UI for visualizing KEX runtime state  
✅ A bilateral state reconciliation monitor  
✅ An inventory + workload tracking system  
✅ A proof ledger viewer with hash verification  
✅ An ethical boundary enforcer with executable gates  
✅ A framework for reviewable AI-assisted coding  

### What This Dashboard IS NOT
❌ The KEX runtime itself (backend only)  
❌ A hardware provisioner or execution engine  
❌ A folder substrate or SSD controller  
❌ A cryptographic proof generator (verifier only)  
❌ A medical, legal, or biological system  
❌ Sentient, conscious, or autonomous  
❌ A replacement for human judgment on ethics or compliance  

### Proof Boundaries
- Dashboard is **presentation layer** only
- All business logic validation happens in adapters + backend
- Proof packets are **records**, not proofs of execution
- Bilateral reconciliation is **state alignment**, not Byzantine consensus
- Ethical gates are **local constraints**, not external validation

## Extending the System

### Adding a New Inventory Object

1. Add to `src/data/inventorySeed.ts`:
```typescript
{
  id: 'KEX-NEW-0001',
  name: 'New KEX Object',
  class: 'UI',
  domain: 'HYPERDRIVE',
  status: 'active',
  evidence: 'E2',
  parent: 'KEX-ARCH-HYPERDRIVE-0001',
  paths: ['src/components/NewComponent.tsx'],
  notes: 'Custom object for new feature.'
}
```

2. Register workload in `WORKLOAD_REGISTER.md`:
```markdown
| WL-0014 | New KEX feature | in_progress | KEX-NEW-0001 | src/components/NewComponent.tsx | ... |
```

3. Update workload seed, run tests, verify manifest hashes

### Adding an Adapter

1. Create `src/lib/adapters/newAdapter.ts`:
```typescript
export interface CustomObject { /* ... */ }

export function queryCustom(filters?: CustomFilters): CustomObject[] {
  // Fetch from backend or return seed
  return customSeed.filter(/* ... */);
}
```

2. Create corresponding test file: `newAdapter.test.ts`
3. Wire into component:
```typescript
import { queryCustom } from '../lib/adapters/newAdapter';

export function NewPanel() {
  const objects = queryCustom();
  return <div>/* render */</div>;
}
```

### Connecting to a Real Backend

Replace seed data with API calls:

```typescript
// src/lib/adapters/inventoryAdapter.ts
export async function queryInventory(query?: InventoryQuery): Promise<InventoryObject[]> {
  const params = new URLSearchParams();
  if (query?.domain) params.append('domain', query.domain);
  if (query?.text) params.append('text', query.text);
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory?${params}`);
  if (!response.ok) throw new Error('Inventory fetch failed');
  return response.json();
}

// Update components to await async calls
export async function InventoryPanel() {
  const objects = await queryInventory();
  // ...
}
```

## Performance & Optimization

- **Virtual scrolling:** `max-height: 430px` with `overflow: auto` on state lists prevents DOM explosion
- **Bilateral debouncing:** Reconciliation only runs if drift exceeds 50ms threshold
- **Lazy component loading:** Each panel is independent, renders on demand
- **Workload summary caching:** `summarizeWorkloads()` memoized in component
- **Manifest integrity:** Single-pass SHA256 verification

## Deployment Considerations

### Security
- All user input validated against schema before applying
- Ethical boundary gates must pass before any affect/identity/health claims
- Proof packets are append-only (no mutation of past actions)
- Bilateral verification prevents single-node compromise

### Compliance
- Full action audit trail in proof ledger
- Non-repudiation: every action has cryptographic hash
- Boundary declarations prevent overclaiming
- Manifest verification ensures artifact integrity

### Scalability
- Dashboard is stateless (can scale horizontally)
- WebSocket connections pooled to primary/mirror lanes
- Bilateral reconciliation is O(1) per cycle
- Inventory queries use in-memory filters (optimize with backend indexing)

## Troubleshooting

### Bilateral Lanes Offline
```
Symptom: "Primary Lane Offline - Auto-Failing to Mirror"
Fix: Ensure ws://localhost:8081/stream/primary and ws://localhost:8082/stream/mirror are running
```

### Workload Adapter Tests Fail
```bash
npm test -- workloadAdapter.test.ts
# All workloads must be registered before testing
# Update WORKLOAD_REGISTER.md first
```

### Manifest Hash Mismatch
```bash
npm run verify:manifest
# Rebuild manifest: commit changes to tracked files first
# Hash will auto-update on next build
```

### Ethical Boundary Failed
```
Symptom: Action blocked with "BLOCK_OR_REPAIR"
Context: Usually affect/identity/health claim without proper constraints
Fix: Review KEX_BRAINK_AFFECT_ETHICS.md, ensure claim stays within boundary
```

## Philosophy

This system is engineered around **proof, transparency, and claim boundaries**. Every component is designed to:

1. **Make state visible** – bilateral lanes, workload register, inventory, proof ledger all visible
2. **Prevent overclaim** – ethical gates, boundary constraints, manifest tracking
3. **Preserve auditability** – every action recorded with hash, parent-child relationships traceable
4. **Enable repair** – failed gates route to `BLOCK_OR_REPAIR`, not silent failure
5. **Respect proof boundaries** – declare what is proven, what is local, what is pending external validation

The dashboard is not magic. It is a **reviewable, testable, auditable proof layer** for a larger KEX/BRAINK ecosystem.

## Contributing

When adding features:
- Add new workload to `WORKLOAD_REGISTER.md` first (declare intent)
- Implement adapter + tests
- Create UI component
- Update inventory seed if new KEX object
- Run full test suite: `npm test`
- Verify manifest integrity
- Submit for review with proof packets visible

## License

[Specify license]

## Further Reading

- `docs/KEX_BRAINK_AFFECT_ETHICS.md` – Ethical model
- `docs/KEX_HYPERDRIVE_INSTANTIATION_RESEARCH.md` – Architecture research
- `WORKLOAD_HARVESTING_LANE.md` – Workload protocol
- `BILATERAL_ARCHITECTURE_WHITEPAPER.md` – Dual-lane reconciliation
