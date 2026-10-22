import type { RuleId } from '@/types/ats';

/**
 * How much each rule counts toward the final score.
 * Without a job description the weights add up to 100.
 * The keyword rule only joins in when a job description is given;
 * the total is then normalised back to 0–100.
 */
export const RULE_WEIGHTS: Record<RuleId, number> = {
  textExtractable: 20,
  sections: 15,
  contact: 10,
  length: 10,
  bulletsAndVerbs: 10,
  quantified: 10,
  dates: 10,
  formatting: 10,
  fileSize: 5,
  keywords: 20,
};
