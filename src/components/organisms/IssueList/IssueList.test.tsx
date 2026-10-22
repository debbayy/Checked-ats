import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { IssueList } from './IssueList';

describe('IssueList', () => {
  it('shows a success state when there are no issues', () => {
    renderWithTheme(<IssueList issues={[]} />);
    expect(screen.getByText(/Tidak ada masalah/)).toBeInTheDocument();
  });

  it('lists every issue', () => {
    renderWithTheme(
      <IssueList
        issues={[
          {
            id: 'a',
            ruleId: 'contact',
            severity: 'critical',
            message: 'Email hilang',
            suggestion: 's',
          },
          { id: 'b', ruleId: 'dates', severity: 'info', message: 'Tanggal', suggestion: 's' },
        ]}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
