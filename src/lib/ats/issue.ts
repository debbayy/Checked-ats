import type { AtsIssue, RuleId, Severity } from '@/types/ats';

/**
 * Build an issue with a deterministic id (`ruleId:key`),
 * so the same problem always gets the same id.
 */
export function createIssue(
  ruleId: RuleId,
  key: string,
  severity: Severity,
  message: string,
  suggestion: string,
): AtsIssue {
  return { id: `${ruleId}:${key}`, ruleId, severity, message, suggestion };
}
