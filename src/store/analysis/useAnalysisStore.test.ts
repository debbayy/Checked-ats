import { GOOD_CV_TEXT, JOB_DESCRIPTION } from '@/lib/ats/__fixtures__/sampleCv';
import { selectHasReport, selectKeywordMatch } from './analysis.selectors';
import { initialAnalysisState, useAnalysisStore } from './useAnalysisStore';

describe('useAnalysisStore', () => {
  beforeEach(() => useAnalysisStore.setState(initialAnalysisState));

  it('stores a report after analyzing', () => {
    useAnalysisStore
      .getState()
      .analyze({ text: GOOD_CV_TEXT, fileType: 'pdf', fileSizeBytes: 1000 });
    const state = useAnalysisStore.getState();

    expect(selectHasReport(state)).toBe(true);
    expect(state.report?.verdict).toBe('good');
    expect(selectKeywordMatch(state)).toBeNull();
  });

  it('exposes keyword matches when a job description is given', () => {
    useAnalysisStore.getState().analyze({
      text: GOOD_CV_TEXT,
      fileType: 'pdf',
      fileSizeBytes: 1000,
      jobDescription: JOB_DESCRIPTION,
    });

    expect(selectKeywordMatch(useAnalysisStore.getState())?.matched).toContain('react');
  });

  it('clears the report', () => {
    useAnalysisStore.getState().analyze({ text: 'x', fileType: 'pdf', fileSizeBytes: 1 });
    useAnalysisStore.getState().clear();
    expect(useAnalysisStore.getState().report).toBeNull();
  });
});
