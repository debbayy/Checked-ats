import { GOOD_CV_TEXT, JOB_DESCRIPTION } from '../__fixtures__/sampleCv';
import { checkKeywords, extractKeywords } from './keywords';

const run = (text: string, jobDescription?: string) =>
  checkKeywords({ text, jobDescription, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkKeywords', () => {
  it('does not apply without a job description', () => {
    expect(run(GOOD_CV_TEXT)).toBeNull();
    expect(run(GOOD_CV_TEXT, '   ')).toBeNull();
  });

  it('extracts meaningful keywords and drops stopwords', () => {
    const keywords = extractKeywords(JOB_DESCRIPTION);
    expect(keywords).toEqual(
      expect.arrayContaining(['react', 'typescript', 'next.js', 'kubernetes']),
    );
    expect(keywords).not.toContain('the');
    expect(keywords).not.toContain('with');
  });

  it('splits keywords into matched and missing', () => {
    const result = run(GOOD_CV_TEXT, JOB_DESCRIPTION);
    expect(result?.details?.keywords?.matched).toEqual(
      expect.arrayContaining(['react', 'typescript', 'graphql']),
    );
    expect(result?.details?.keywords?.missing).toEqual(
      expect.arrayContaining(['kubernetes', 'docker', 'aws']),
    );
  });

  it('flags a CV that matches almost nothing', () => {
    const result = run('Saya seorang koki.', 'Python Django PostgreSQL Redis Celery');
    expect(result?.score).toBe(0);
    expect(result?.issues[0]?.severity).toBe('critical');
  });
});
