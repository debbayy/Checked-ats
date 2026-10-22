import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import type { AtsReport } from '@/types/ats';
import { ScoreOverview } from './ScoreOverview';

const report: AtsReport = {
  totalScore: 72,
  verdict: 'fair',
  wordCount: 420,
  rules: [],
  issues: [
    { id: 'a', ruleId: 'contact', severity: 'critical', message: 'm', suggestion: 's' },
    { id: 'b', ruleId: 'dates', severity: 'warning', message: 'm', suggestion: 's' },
  ],
};

describe('ScoreOverview', () => {
  it('shows score, verdict, counts and the disclaimer', () => {
    renderWithTheme(<ScoreOverview report={report} />);
    expect(screen.getByRole('img', { name: 'Skor ATS 72 dari 100' })).toBeInTheDocument();
    expect(screen.getByText('Perlu perbaikan')).toBeInTheDocument();
    expect(screen.getByText('420 kata terbaca')).toBeInTheDocument();
    expect(screen.getByText('1 kritis')).toBeInTheDocument();
    expect(screen.getByText(/bukan skor resmi/)).toBeInTheDocument();
  });
});
