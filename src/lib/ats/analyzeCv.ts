import type { AtsInput, AtsIssue, AtsReport, RuleResult, Severity, Verdict } from '@/types/ats';
import { ATS_RULES } from './rules';
import { countWords } from './text';

export const VERDICT_THRESHOLDS = { good: 80, fair: 60 };

const SEVERITY_ORDER: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };

export function getVerdict(score: number): Verdict {
  if (score >= VERDICT_THRESHOLDS.good) return 'good';
  if (score >= VERDICT_THRESHOLDS.fair) return 'fair';
  return 'poor';
}

/** Weighted average of rule scores, scaled to 0–100. */
export function calculateTotalScore(rules: RuleResult[]): number {
  const totalWeight = rules.reduce((sum, rule) => sum + rule.weight, 0);
  if (totalWeight === 0) return 0;
  const earned = rules.reduce((sum, rule) => sum + rule.score * rule.weight, 0);
  return Math.round((earned / totalWeight) * 100);
}

export function sortIssuesBySeverity(issues: AtsIssue[]): AtsIssue[] {
  return [...issues].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

/** Run every rule against a CV and build the full report. */
export function analyzeCv(input: AtsInput): AtsReport {
  const rules = ATS_RULES.map((rule) => rule(input)).filter(
    (result): result is RuleResult => result !== null,
  );
  const totalScore = calculateTotalScore(rules);

  return {
    totalScore,
    verdict: getVerdict(totalScore),
    rules,
    issues: sortIssuesBySeverity(rules.flatMap((rule) => rule.issues)),
    wordCount: countWords(input.text),
  };
}
