import {
  repositoryConnectorSeed,
  type RepositoryConnectorEntry,
  type RepositoryRole,
  type RepositorySystem,
  type GovernanceState,
} from '../../data/repositoryConnectorSeed';

export type RepositoryQuery = {
  role?: RepositoryRole;
  governanceState?: GovernanceState;
  language?: string;
  text?: string;
};

export type SystemQuery = {
  layer?: string;
  repositoryId?: string;
  text?: string;
};

export type EcosystemSummary = {
  totalRepositories: number;
  totalSystems: number;
  byRole: Record<RepositoryRole, number>;
  byGovernanceState: Record<GovernanceState, number>;
  integrationPointCount: number;
};

/**
 * Query repositories by role, governance state, language, or free-text search.
 */
export function queryRepositories(query: RepositoryQuery = {}): RepositoryConnectorEntry[] {
  return repositoryConnectorSeed.filter((repo) => {
    if (query.role && repo.role !== query.role) return false;
    if (query.governanceState && repo.governanceState !== query.governanceState) return false;
    if (query.language && repo.language !== query.language) return false;
    if (query.text) {
      const haystack = `${repo.repositoryId} ${repo.name} ${repo.description} ${repo.systems.map((s) => s.name).join(' ')}`.toLowerCase();
      if (!haystack.includes(query.text.toLowerCase())) return false;
    }
    return true;
  });
}

/**
 * Query systems across all repositories by layer, repository, or free-text.
 */
export function querySystems(query: SystemQuery = {}): (RepositorySystem & { repositoryName: string })[] {
  const results: (RepositorySystem & { repositoryName: string })[] = [];
  for (const repo of repositoryConnectorSeed) {
    for (const system of repo.systems) {
      if (query.repositoryId && repo.repositoryId !== query.repositoryId) continue;
      if (query.layer && system.layer !== query.layer) continue;
      if (query.text) {
        const haystack = `${system.systemId} ${system.name} ${system.description} ${system.layer}`.toLowerCase();
        if (!haystack.includes(query.text.toLowerCase())) continue;
      }
      results.push({ ...system, repositoryName: repo.name });
    }
  }
  return results;
}

/**
 * Produce a summary of the full repository ecosystem.
 */
export function summarizeEcosystem(): EcosystemSummary {
  const byRole: Record<RepositoryRole, number> = {
    GOVERNANCE_ROOT: 0,
    APPLICATION: 0,
    ENGINEERING: 0,
    CONTROL_PLANE: 0,
  };
  const byGovernanceState: Record<GovernanceState, number> = {
    STATE_MODEL_LOCAL: 0,
    STATE_PENDING_ADOPTION: 0,
    STATE_CHECKER_PASSED: 0,
  };

  let totalSystems = 0;
  let integrationPointCount = 0;

  for (const repo of repositoryConnectorSeed) {
    byRole[repo.role]++;
    byGovernanceState[repo.governanceState]++;
    totalSystems += repo.systems.length;
    integrationPointCount += repo.integrationPoints.length;
  }

  return {
    totalRepositories: repositoryConnectorSeed.length,
    totalSystems,
    byRole,
    byGovernanceState,
    integrationPointCount,
  };
}

/**
 * Resolve all integration points for a given repository, returning the
 * target repository entries and the named integration channel.
 */
export function resolveIntegrationPoints(
  repositoryId: string
): { target: RepositoryConnectorEntry; channel: string }[] {
  const repo = repositoryConnectorSeed.find((r) => r.repositoryId === repositoryId);
  if (!repo) return [];
  return repo.integrationPoints
    .map((point) => {
      const [targetName, channel] = point.split(':');
      const target = repositoryConnectorSeed.find((r) => r.name === targetName);
      if (!target) return null;
      return { target, channel };
    })
    .filter((entry): entry is { target: RepositoryConnectorEntry; channel: string } => entry !== null);
}

/**
 * Produce the iterative use sequence: the ordered list of repositories
 * and their systems that should be consulted when expanding the ecosystem.
 * Order: GOVERNANCE_ROOT -> APPLICATION -> ENGINEERING -> CONTROL_PLANE
 */
export function iterativeUseSequence(): RepositoryConnectorEntry[] {
  const roleOrder: RepositoryRole[] = ['GOVERNANCE_ROOT', 'APPLICATION', 'ENGINEERING', 'CONTROL_PLANE'];
  return [...repositoryConnectorSeed].sort(
    (a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)
  );
}
