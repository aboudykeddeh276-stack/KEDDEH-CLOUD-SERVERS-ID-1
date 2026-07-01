/**
 * Repository Connector Seed
 *
 * Maps the KEDDEH ecosystem repositories and their systems for iterative
 * cross-repository integration. Each repository entry carries its role,
 * systems, governance state, and integration points.
 *
 * Governed by: GENERAL-GOVERNANCE- / CROSS_REPOSITORY_REGISTER.md
 */

export type RepositoryRole =
  | 'GOVERNANCE_ROOT'
  | 'APPLICATION'
  | 'ENGINEERING'
  | 'CONTROL_PLANE';

export type GovernanceState =
  | 'STATE_MODEL_LOCAL'
  | 'STATE_PENDING_ADOPTION'
  | 'STATE_CHECKER_PASSED';

export type RepositorySystem = {
  systemId: string;
  name: string;
  layer: string;
  description: string;
  entryPaths: string[];
};

export type RepositoryConnectorEntry = {
  repositoryId: string;
  name: string;
  owner: string;
  role: RepositoryRole;
  language: string;
  governanceState: GovernanceState;
  defaultBranch: string;
  description: string;
  systems: RepositorySystem[];
  integrationPoints: string[];
};

export const repositoryConnectorSeed: RepositoryConnectorEntry[] = [
  {
    repositoryId: 'REPO-GOVERNANCE-001',
    name: 'GENERAL-GOVERNANCE-',
    owner: 'aboudykeddeh276-stack',
    role: 'GOVERNANCE_ROOT',
    language: 'Python',
    governanceState: 'STATE_CHECKER_PASSED',
    defaultBranch: 'main',
    description: 'Root repository-management standard for BRAINK/KEX repositories. Source-of-truth for standards.',
    systems: [
      {
        systemId: 'SYS-GOV-VALIDATOR',
        name: 'Governance Validator',
        layer: 'VALIDATION',
        description: 'Python checker that validates governance artifacts across repositories.',
        entryPaths: ['scripts/validate-governance.py'],
      },
      {
        systemId: 'SYS-GOV-CROSS-REGISTER',
        name: 'Cross-Repository Register',
        layer: 'LEDGER',
        description: 'Authoritative register of governed repositories and their adoption status.',
        entryPaths: ['CROSS_REPOSITORY_REGISTER.md'],
      },
      {
        systemId: 'SYS-GOV-STANDARDS',
        name: 'Governance Standards',
        layer: 'DEFINITION',
        description: 'Naming, state, function, and whole-identification rules for all repositories.',
        entryPaths: ['docs/governance/repository-governance-standard.md'],
      },
    ],
    integrationPoints: [
      'BRAINK:governance-artifacts',
      'KEDDEH_SOFTWARE_NODES:pending-governance-adoption',
      'KEDDEH-CLOUD-SERVERS-ID-1:pending-governance-adoption',
    ],
  },
  {
    repositoryId: 'REPO-BRAINK-001',
    name: 'BRAINK',
    owner: 'aboudykeddeh276-stack',
    role: 'APPLICATION',
    language: 'Swift',
    governanceState: 'STATE_CHECKER_PASSED',
    defaultBranch: 'main',
    description: 'BRAINK/KEX system anchor. Swift NativeChatBot application with KEX scripts and governance artifacts.',
    systems: [
      {
        systemId: 'SYS-BRAINK-CHATBOT',
        name: 'NativeChatBot',
        layer: 'APPLICATION',
        description: 'Swift native chatbot interface for BRAINK interactions.',
        entryPaths: ['NativeChatBot/'],
      },
      {
        systemId: 'SYS-BRAINK-KEX-SCRIPTS',
        name: 'KEX Scripts',
        layer: 'PROCESSING',
        description: 'KEX processing scripts and utilities.',
        entryPaths: ['kex/'],
      },
      {
        systemId: 'SYS-BRAINK-TOOLS',
        name: 'BRAINK Tools',
        layer: 'TOOLING',
        description: 'Development and operational tools for the BRAINK system.',
        entryPaths: ['tools/'],
      },
      {
        systemId: 'SYS-BRAINK-KEX-CONFIG',
        name: 'KEX Configuration',
        layer: 'DEFINITION',
        description: 'KEX identity and configuration anchor.',
        entryPaths: ['.kex/'],
      },
    ],
    integrationPoints: [
      'GENERAL-GOVERNANCE-:governance-standard',
      'KEDDEH-CLOUD-SERVERS-ID-1:control-plane-projection',
    ],
  },
  {
    repositoryId: 'REPO-SOFTWARE-NODES-001',
    name: 'KEDDEH_SOFTWARE_NODES',
    owner: 'aboudykeddeh276-stack',
    role: 'ENGINEERING',
    language: 'TypeScript',
    governanceState: 'STATE_PENDING_ADOPTION',
    defaultBranch: 'main',
    description: 'In-house dependencies, calls, and nodes. KEX HyperDrive Dashboard UI with KEX-* inventory system.',
    systems: [
      {
        systemId: 'SYS-NODES-DASHBOARD',
        name: 'KEX HyperDrive Dashboard',
        layer: 'UI',
        description: 'Dashboard skeleton mirroring the control-plane projection pattern.',
        entryPaths: ['src/'],
      },
      {
        systemId: 'SYS-NODES-MIRROR-LANE',
        name: 'Mirror Lane Storage Substrate',
        layer: 'STORAGE',
        description: 'Mirror-side governance and software records.',
        entryPaths: ['mirror_lane_storage_substrate/'],
      },
      {
        systemId: 'SYS-NODES-INVENTORY',
        name: 'Inventory System',
        layer: 'LEDGER',
        description: 'KEX inventory and workload register for the engineering node.',
        entryPaths: ['INVENTORY.md', 'WORKLOAD_REGISTER.md'],
      },
    ],
    integrationPoints: [
      'GENERAL-GOVERNANCE-:pending-governance-adoption',
      'KEDDEH-CLOUD-SERVERS-ID-1:shared-architecture',
    ],
  },
  {
    repositoryId: 'REPO-CLOUD-SERVERS-001',
    name: 'KEDDEH-CLOUD-SERVERS-ID-1',
    owner: 'aboudykeddeh276-stack',
    role: 'CONTROL_PLANE',
    language: 'TypeScript',
    governanceState: 'STATE_MODEL_LOCAL',
    defaultBranch: 'main',
    description: 'KEX HyperDrive Control Plane. Front-facing projection surface for the KEX/BRAINK runtime ecosystem.',
    systems: [
      {
        systemId: 'SYS-CP-DASHBOARD',
        name: 'Dashboard Projection Layer',
        layer: 'UI',
        description: 'React/Vite/TypeScript dashboard projecting inventory, workload, bilateral, and proof state.',
        entryPaths: ['src/App.tsx', 'src/components/'],
      },
      {
        systemId: 'SYS-CP-BILATERAL',
        name: 'Bilateral Runtime',
        layer: 'RUNTIME',
        description: 'Active-active bilateral reconciliation hook with drift detection.',
        entryPaths: ['src/hooks/useBilateralRuntime.ts'],
      },
      {
        systemId: 'SYS-CP-ADAPTERS',
        name: 'Adapter Layer',
        layer: 'QUERY',
        description: 'Inventory, workload, and repository connector adapters.',
        entryPaths: ['src/lib/adapters/'],
      },
      {
        systemId: 'SYS-CP-VALIDATORS',
        name: 'Control Plane Validators',
        layer: 'VALIDATION',
        description: 'Control row validation and affect/ethics gate.',
        entryPaths: ['src/lib/validators.ts'],
      },
      {
        systemId: 'SYS-CP-LEDGER',
        name: 'Proof Ledger',
        layer: 'LEDGER',
        description: 'Append-only inventory event log with SHA256 manifest tracking.',
        entryPaths: ['src/lib/ledger/', 'MANIFEST.json'],
      },
      {
        systemId: 'SYS-CP-MIRROR',
        name: 'Mirror Lane Storage',
        layer: 'STORAGE',
        description: 'Mirror-side governance, proof conventions, and cell network engine.',
        entryPaths: ['mirror_lane_storage_substrate/'],
      },
      {
        systemId: 'SYS-CP-CONNECTOR',
        name: 'Repository Connector',
        layer: 'INTEGRATION',
        description: 'Cross-repository integration adapter mapping ecosystem repositories and their systems.',
        entryPaths: ['src/data/repositoryConnectorSeed.ts', 'src/lib/adapters/repositoryConnectorAdapter.ts'],
      },
    ],
    integrationPoints: [
      'GENERAL-GOVERNANCE-:pending-governance-adoption',
      'BRAINK:control-plane-projection',
      'KEDDEH_SOFTWARE_NODES:shared-architecture',
    ],
  },
];

export function findRepository(repositoryId: string): RepositoryConnectorEntry | undefined {
  return repositoryConnectorSeed.find((repo) => repo.repositoryId === repositoryId);
}

export function findRepositoryByName(name: string): RepositoryConnectorEntry | undefined {
  return repositoryConnectorSeed.find((repo) => repo.name === name);
}

export function listRepositoriesByRole(role: RepositoryRole): RepositoryConnectorEntry[] {
  return repositoryConnectorSeed.filter((repo) => repo.role === role);
}
