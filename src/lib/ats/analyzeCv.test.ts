import type { RuleResult } from '@/types/ats';
import { GOOD_CV_TEXT, JOB_DESCRIPTION } from './__fixtures__/sampleCv';
import { analyzeCv, calculateTotalScore, getVerdict } from './analyzeCv';

const rule = (score: number, weight: number): RuleResult => ({
  id: 'sections',
  label: 'x',
  score,
  weight,
  issues: [],
});

describe('analyzeCv', () => {
  it('computes a weighted total', () => {
    expect(calculateTotalScore([rule(1, 30), rule(0.5, 10)])).toBe(88);
    expect(calculateTotalScore([])).toBe(0);
  });

  it('maps scores to verdicts', () => {
    expect(getVerdict(85)).toBe('good');
    expect(getVerdict(70)).toBe('fair');
    expect(getVerdict(30)).toBe('poor');
  });

  it('rates the sample CV as good without a job description', () => {
    const report = analyzeCv({
      text: GOOD_CV_TEXT,
      fileType: 'pdf',
      fileSizeBytes: 200_000,
      pageCount: 1,
    });
    expect(report.verdict).toBe('good');
    expect(report.totalScore).toBeGreaterThanOrEqual(90);
    expect(report.rules.some((r) => r.id === 'keywords')).toBe(false);
  });

  it('includes the keyword rule when a job description is given', () => {
    const report = analyzeCv({
      text: GOOD_CV_TEXT,
      fileType: 'pdf',
      fileSizeBytes: 200_000,
      jobDescription: JOB_DESCRIPTION,
    });
    expect(report.rules.some((r) => r.id === 'keywords')).toBe(true);
  });

  it('rates an unreadable CV as poor and lists critical issues first', () => {
    const report = analyzeCv({ text: 'scan', fileType: 'pdf', fileSizeBytes: 6_000_000 });
    expect(report.verdict).toBe('poor');
    expect(report.issues[0]?.severity).toBe('critical');
  });
});
