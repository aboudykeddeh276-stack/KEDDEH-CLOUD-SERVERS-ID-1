# KEX HyperDrive Dashboard UI

A highly engineered, modular dashboard skeleton for a front-facing KEX/BRAINK runtime control plane. This UI serves as the command and monitoring interface for distributed knowledge computation, hyper-computer orchestration, and ledger-verified operations.

## System Architecture

### Core Stack

The KEX HyperDrive ecosystem is built on a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│         KEX HyperDrive Dashboard UI (This Project)          │
│                    React/SvelteKit Frontend                  │
├─────────────────────────────────────────────────────────────┤
│  Knowledge Sheets  ��  Folder Watcher  │  Ledger Verifier    │
├─────────────────────────────────────────────────────────────┤
│ Intent Translation  │ Command Routing │ Proof Verification  │
├─────────────────────────────────────────────────────────────┤
│            KEX Query Engine / Router (Backend)              │
│         Processes intent packets and orchestrates flow      │
├─────────────────────────────────────────────────────────────┤
│  Folder Substrate   │  SSD / Nested KSSD Storage Layer     │
│    Hierarchical namespace with versioning and snapshots    │
├─────────────────────────────────────────────────────────────┤
│              Hyper Computers (Compute Cluster)              │
│  Distributed processing nodes executing compiled queries    │
├──────────────────��──────────────────────────────────────────┤
│            GPU / MUX Screen (Acceleration Layer)            │
│   GPU-resident computation, vector operations, shaders      │
├─────────────────────────────────────────────────────────────┤
│  Host Chat Interface  │  Runtime State Monitoring           │
│   User interaction layer and real-time telemetry            │
├─────────────────────────────────────────────────────────────┤
│     Ledger / Proof Capsule (Immutable Audit Trail)         │
│    Cryptographic verification of all state transitions      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Model

```
Knowledge Sheets
  ↓ [User-facing structured data definitions]
Front-Facing Address Space
  ↓ [Addressable resource namespace]
KEX Query Engine / Router
  ↓ [Parse, validate, and route queries]
Folder Substrate
  ↓ [Hierarchical storage addressing]
SSD / Nested KSSD
  ↓ [Persistent storage with nested indexing]
Hyper Computers
  ↓ [Distributed computation across cluster]
GPU / MUX Screen
  ↓ [Optional GPU acceleration]
Host Chat
  ↓ [Real-time user feedback and monitoring]
Ledger / Proof Capsule
  ↓ [Immutable record of all operations with cryptographic proof]
```

## Components & Responsibilities

### Knowledge Sheets Layer
- **Purpose**: Define the domain model and data structures available to users
- **Function**: Acts as the schema for all queries and operations
- **Data Format**: Structured definitions (JSON/YAML) describing available entities and their properties
- **Examples**: User resources, compute jobs, storage buckets, verification states

### Front-Facing Address Space
- **Purpose**: Provide a user-friendly namespace for accessing resources
- **Function**: Maps human-readable paths to internal identifiers
- **Examples**: `/users/admin/jobs/job-123`, `/storage/drive-a/archive/dataset-x`
- **Security**: Enforces access control at addressing layer

### KEX Query Engine / Router
- **Purpose**: Central intelligence for routing and executing queries
- **Functions**:
  - Parse incoming queries from the dashboard
  - Validate against Knowledge Sheets
  - Determine execution path (local vs. distributed)
  - Route to appropriate backend services
- **Features**: Query optimization, caching, load balancing

### Folder Substrate
- **Purpose**: Hierarchical logical organization of stored data
- **Structure**: Tree-based namespace mirroring filesystem semantics
- **Operations**: Create, read, update, list, delete folders and contents
- **Versioning**: Supports snapshots and historical states

### SSD / Nested KSSD (Knowledge Substrate Storage Disk)
- **Purpose**: Persistent storage with nested indexing for rapid retrieval
- **Architecture**: 
  - Primary SSD layer for hot data
  - Nested KSSD for logical data organization
  - Automatic tiering and compression
- **Features**: ACID compliance, transaction support, sharding

### Hyper Computers
- **Purpose**: Distributed compute cluster for executing queries and jobs
- **Capabilities**:
  - Parallel query execution
  - Map-reduce style batch processing
  - Real-time stream processing
  - Inter-node communication and coordination
- **Nodes**: Stateless workers that receive instructions from the KEX Router

### GPU / MUX Screen
- **Purpose**: Hardware acceleration for compute-intensive operations
- **Functions**:
  - Vector operations (matrix math, transformations)
  - Shader-based transformations
  - Stream processing acceleration
  - Real-time rendering of large datasets
- **Multiplexing**: Smart scheduling of GPU resources across multiple requests

### Host Chat
- **Purpose**: Real-time bidirectional communication interface
- **Functions**:
  - User commands and queries
  - System status updates and alerts
  - Error reporting and debugging
  - Real-time telemetry streaming

### Ledger / Proof Capsule
- **Purpose**: Immutable, cryptographically-verified audit trail
- **Features**:
  - Hash-linked transaction chain
  - Cryptographic signatures on all state mutations
  - Merkle trees for proof generation
  - Non-repudiation guarantees
- **Verification**: Off-chain proof validators can independently verify capsule integrity

## Running the Dashboard

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Access to backend KEX Query Engine

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# The dashboard will be available at http://localhost:5173 (or similar)
```

### Build for Production

```bash
npm run build
npm start
```

## Populating with Data

### Step 1: Define Placeholder Data

Edit the placeholder layer to match your domain model:

```text
src/data/placeholders.ts
```

This file contains mock data for:
- Knowledge Sheet definitions
- Sample resources and entities
- Initial state for the dashboard
- Test scenarios and edge cases

Example structure:
```typescript
export const KNOWLEDGE_SHEETS = {
  jobs: { /* job schema */ },
  resources: { /* resource schema */ },
  // ... more definitions
};

export const SAMPLE_DATA = {
  activeJobs: [ /* mock job instances */ ],
  // ... more data
};
```

### Step 2: Wire Real Adapters

Connect to live backend services through adapters:

```text
src/lib/adapters/
```

Key adapters to implement:

#### `sheetAdapter.ts`
- Fetches live Knowledge Sheet definitions from backend
- Caches schema definitions locally
- Subscribes to schema version updates

#### `folderWatcherAdapter.ts`
- Monitors folder substrate changes in real-time
- Subscribes to file system events
- Updates dashboard UI on mutations

#### `ledgerAdapter.ts`
- Connects to the Ledger / Proof Capsule
- Verifies operation proofs
- Queries immutable operation history
- Validates cryptographic signatures

#### `muxAdapter.ts`
- Communicates with GPU / MUX Screen layer
- Submits accelerated computation jobs
- Receives results and status updates
- Handles job queuing and scheduling

#### `hostChatAdapter.ts`
- Establishes WebSocket or SSE connection to Host Chat
- Sends user commands to backend
- Streams real-time system messages and alerts
- Handles disconnection and retry logic

#### `kexQueryAdapter.ts`
- Sends queries to KEX Query Engine / Router
- Handles query parsing and validation errors
- Manages pagination and streaming results
- Implements request cancellation

### Safe Operation Flow

The recommended data flow ensures safety and auditability:

```
1. User Input Sheet Row
   ↓
2. Dashboard Validation
   [Check against Knowledge Sheets, type safety, constraints]
   ↓
3. Build Intent Packet
   [Serialize user action into protocol-specific format]
   ↓
4. Ledger Preflight Check
   [Query ledger for permission, quotas, prerequisites]
   ↓
5. Apply Allowlisted Action
   [Execute operation only if pre-verified by ledger]
   ↓
6. Ledger Result Recording
   [Write operation result to immutable ledger with proof]
   ↓
7. Update Dashboard State
   [Reflect new state in UI, refresh relevant views]
```

This ensures:
- **Auditability**: All operations recorded in immutable ledger
- **Safety**: Preflight checks prevent unsafe operations
- **Consistency**: Ledger acts as source of truth
- **Non-repudiation**: Cryptographic proof of who did what

## Architectural Boundaries

### Scope of This Project (Dashboard UI)

This repository is responsible for:
- ✅ Presenting the runtime state visually
- ✅ Accepting user commands via the UI
- ✅ Validating user input locally
- ✅ Fetching and displaying real-time data
- ✅ Showing operation history from the ledger
- ✅ Displaying error states and alerts

### What This Project Does NOT Do

- ❌ Create real hardware or infrastructure
- ❌ Execute arbitrary system commands
- ❌ Directly mutate the Folder Substrate
- ❌ Modify SSD / KSSD storage without backend verification
- ❌ Perform cryptographic signing (delegated to backend)
- ❌ Execute GPU computations directly (submits jobs to GPU / MUX Screen)
- ❌ Maintain the Ledger / Proof Capsule (read-only access)

### Dependencies

The dashboard requires a running backend consisting of:

1. **KEX Query Engine / Router** - Core query processing and routing
2. **Folder Substrate Service** - Storage and hierarchy management
3. **Hyper Computer Cluster** - Distributed computation (optional, depending on workload)
4. **GPU / MUX Screen Service** - Acceleration layer (optional)
5. **Host Chat Service** - Real-time communication
6. **Ledger Service** - Immutable operation records

## Development Workflow

### Adding a New Data Type

1. Add schema to `src/data/placeholders.ts` under Knowledge Sheets
2. Create adapter in `src/lib/adapters/` to fetch live data
3. Create UI component in `src/components/` to display
4. Update router in `src/routes/` if needed
5. Test with mock data before connecting to live backend

### Testing with Placeholder Data

```bash
npm run dev:mocks
# Uses placeholder data, no backend required
```

### Testing with Live Backend

```bash
# Configure backend URL
export KEX_BACKEND_URL=http://your-backend:3000

npm run dev
```

### Security Considerations

- All user input validated against Knowledge Sheets
- API requests authenticated with backend
- Cryptographic proof verification before displaying sensitive operations
- Rate limiting on UI-initiated actions
- Session timeout and automatic re-authentication

## File Structure

```
KEX_HYPERDRIVE_DASHBOARD_UI/
├── src/
│   ├── components/        # React/SvelteKit components
│   ├── lib/
│   │   ├── adapters/      # Backend integration layer
│   │   ├── utils/         # Utility functions
│   │   └── types.ts       # TypeScript type definitions
│   ├── data/
│   │   └── placeholders.ts # Mock/placeholder data
│   ├── routes/            # Page routes and API endpoints
│   └── styles/            # CSS and styling
├── public/                # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## Performance Optimization

- **Client-side caching**: Reduces round-trips to backend
- **Lazy loading**: Dashboard components loaded on-demand
- **Virtual scrolling**: Efficiently renders large lists
- **WebSocket streaming**: Real-time updates without polling
- **Query debouncing**: Prevents excessive backend requests

## Future Enhancements

- [ ] Dark mode and theme customization
- [ ] Advanced query builder with syntax highlighting
- [ ] Real-time collaboration with conflict resolution
- [ ] Proof verification visualization
- [ ] Custom dashboard layouts and widgets
- [ ] Mobile-responsive interface
- [ ] Multi-language support
- [ ] Performance monitoring dashboard
- [ ] Batch operation management
- [ ] Advanced role-based access control (RBAC)

## Troubleshooting

### Backend Connection Issues
- Check `KEX_BACKEND_URL` environment variable
- Verify backend service is running
- Check firewall and CORS settings

### Missing Placeholder Data
- Ensure `src/data/placeholders.ts` is properly formatted
- Check console for TypeScript compilation errors

### Adapter Initialization Failures
- Verify adapter implementations match interface contracts
- Check backend service availability
- Review adapter logs for detailed error messages

## Contributing

When extending the dashboard:

1. Maintain separation between UI and data fetching logic
2. Use adapters for all backend communication
3. Keep components focused and single-responsibility
4. Write tests for adapter implementations
5. Document new Knowledge Sheet types
6. Update this README with architectural changes

## License

[Specify your license here]

## Support

For issues or questions:
- Check the troubleshooting section above
- Review backend service logs
- Consult the adapter implementation guides
