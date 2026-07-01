import { describe, it, expect } from 'vitest';
import {
  queryRepositories,
  querySystems,
  summarizeEcosystem,
  resolveIntegrationPoints,
  iterativeUseSequence,
} from './repositoryConnectorAdapter';

describe('repositoryConnectorAdapter', () => {
  describe('queryRepositories', () => {
    it('returns all repositories when no query is provided', () => {
      const results = queryRepositories();
      expect(results.length).toBe(4);
    });

    it('filters by role', () => {
      const governance = queryRepositories({ role: 'GOVERNANCE_ROOT' });
      expect(governance.length).toBe(1);
      expect(governance[0].name).toBe('GENERAL-GOVERNANCE-');
    });

    it('filters by governance state', () => {
      const passed = queryRepositories({ governanceState: 'STATE_CHECKER_PASSED' });
      expect(passed.length).toBe(2);
    });

    it('filters by language', () => {
      const ts = queryRepositories({ language: 'TypeScript' });
      expect(ts.length).toBe(2);
    });

    it('supports text search', () => {
      const results = queryRepositories({ text: 'nativechatbot' });
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('BRAINK');
    });
  });

  describe('querySystems', () => {
    it('returns all systems when no query is provided', () => {
      const results = querySystems();
      expect(results.length).toBeGreaterThan(10);
    });

    it('filters by layer', () => {
      const validationSystems = querySystems({ layer: 'VALIDATION' });
      expect(validationSystems.length).toBe(2);
    });

    it('filters by repository', () => {
      const cpSystems = querySystems({ repositoryId: 'REPO-CLOUD-SERVERS-001' });
      expect(cpSystems.length).toBe(7);
      expect(cpSystems.every((s) => s.repositoryName === 'KEDDEH-CLOUD-SERVERS-ID-1')).toBe(true);
    });

    it('supports text search across systems', () => {
      const results = querySystems({ text: 'reconciliation' });
      expect(results.length).toBe(1);
      expect(results[0].systemId).toBe('SYS-CP-BILATERAL');
    });
  });

  describe('summarizeEcosystem', () => {
    it('returns correct totals', () => {
      const summary = summarizeEcosystem();
      expect(summary.totalRepositories).toBe(4);
      expect(summary.totalSystems).toBeGreaterThan(10);
      expect(summary.byRole.GOVERNANCE_ROOT).toBe(1);
      expect(summary.byRole.APPLICATION).toBe(1);
      expect(summary.byRole.ENGINEERING).toBe(1);
      expect(summary.byRole.CONTROL_PLANE).toBe(1);
      expect(summary.integrationPointCount).toBeGreaterThan(0);
    });
  });

  describe('resolveIntegrationPoints', () => {
    it('resolves integration points for cloud servers', () => {
      const points = resolveIntegrationPoints('REPO-CLOUD-SERVERS-001');
      expect(points.length).toBe(3);
      const targetNames = points.map((p) => p.target.name);
      expect(targetNames).toContain('GENERAL-GOVERNANCE-');
      expect(targetNames).toContain('BRAINK');
      expect(targetNames).toContain('KEDDEH_SOFTWARE_NODES');
    });

    it('returns empty for unknown repository', () => {
      const points = resolveIntegrationPoints('REPO-DOES-NOT-EXIST');
      expect(points.length).toBe(0);
    });
  });

  describe('iterativeUseSequence', () => {
    it('returns repositories in governance-first order', () => {
      const sequence = iterativeUseSequence();
      expect(sequence[0].role).toBe('GOVERNANCE_ROOT');
      expect(sequence[sequence.length - 1].role).toBe('CONTROL_PLANE');
    });

    it('returns all repositories', () => {
      const sequence = iterativeUseSequence();
      expect(sequence.length).toBe(4);
    });
  });
});
