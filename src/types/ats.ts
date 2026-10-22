/**
 * Shared types for the ATS checker.
 * Everything the scoring engine consumes and produces is described here,
 * so components, stores and rules all speak the same language.
 */

export type CvFileType = 'pdf' | 'docx';

export type Severity = 'critical' | 'warning' | 'info';

export type RuleId =
  | 'textExtractable'
  | 'sections'
  | 'contact'
  | 'length'
  | 'bulletsAndVerbs'
  | 'quantified'
  | 'dates'
  | 'formatting'
  | 'fileSize'
  | 'keywords';

export type Verdict = 'good' | 'fair' | 'poor';

/** What the scoring engine needs to know about a CV. */
export interface AtsInput {
  text: string;
  fileType: CvFileType;
  fileSizeBytes: number;
  /** Only known for PDFs. */
  pageCount?: number;
  /** Optional job description used for keyword matching. */
  jobDescription?: string;
}

export interface AtsIssue {
  id: string;
  ruleId: RuleId;
  severity: Severity;
  message: string;
  suggestion: string;
}

export interface KeywordMatch {
  matched: string[];
  missing: string[];
}

/** Result of a single rule. `score` is always between 0 and 1. */
export interface RuleResult {
  id: RuleId;
  label: string;
  weight: number;
  score: number;
  issues: AtsIssue[];
  /** Extra data a rule wants to expose to the UI (e.g. keyword lists). */
  details?: { keywords?: KeywordMatch };
}

export interface AtsReport {
  /** 0–100, rounded. */
  totalScore: number;
  verdict: Verdict;
  rules: RuleResult[];
  /** All issues from every rule, most severe first. */
  issues: AtsIssue[];
  wordCount: number;
}

/** A rule returns `null` when it does not apply (e.g. keywords without a JD). */
export type AtsRule = (input: AtsInput) => RuleResult | null;
