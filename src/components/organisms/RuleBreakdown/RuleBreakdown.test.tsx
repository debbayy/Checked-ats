import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { RuleBreakdown } from './RuleBreakdown';

describe('RuleBreakdown', () => {
  it('renders a row for every rule', () => {
    renderWithTheme(
      <RuleBreakdown
        rules={[
          { id: 'contact', label: 'Info kontak', weight: 10, score: 1, issues: [] },
          { id: 'dates', label: 'Format tanggal', weight: 10, score: 0.6, issues: [] },
        ]}
      />,
    );
    expect(screen.getAllByRole('meter')).toHaveLength(2);
  });
});
