import { act, screen } from '@testing-library/react';
import { GOOD_CV_TEXT, JOB_DESCRIPTION } from '@/lib/ats/__fixtures__/sampleCv';
import { initialAnalysisState, initialCvState, useAnalysisStore, useCvStore } from '@/store';
import { renderWithTheme } from '@/test/renderWithTheme';
import { ResultsView } from './ResultsView';

describe('ResultsView', () => {
  beforeEach(() => {
    useCvStore.setState(initialCvState);
    useAnalysisStore.setState(initialAnalysisState);
  });

  it('shows what gets checked before any upload', () => {
    renderWithTheme(<ResultsView />);
    expect(screen.getByRole('heading', { name: 'Yang dicek' })).toBeInTheDocument();
  });

  it('shows the full report after analysis', () => {
    renderWithTheme(<ResultsView />);
    act(() => {
      useAnalysisStore.getState().analyze({
        text: GOOD_CV_TEXT,
        fileType: 'pdf',
        fileSizeBytes: 1000,
        jobDescription: JOB_DESCRIPTION,
      });
    });

    expect(screen.getByRole('region', { name: 'Skor ATS' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Yang perlu diperbaiki' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kecocokan keyword lowongan' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rincian skor' })).toBeInTheDocument();
  });
});
