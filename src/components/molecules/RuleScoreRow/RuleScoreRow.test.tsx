import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { RuleScoreRow } from './RuleScoreRow';

describe('RuleScoreRow', () => {
  it('shows earned points out of the rule weight', () => {
    renderWithTheme(
      <ul>
        <RuleScoreRow
          rule={{ id: 'contact', label: 'Info kontak', weight: 10, score: 0.55, issues: [] }}
        />
      </ul>,
    );
    expect(screen.getByText('Info kontak')).toBeInTheDocument();
    expect(screen.getByText('5.5 / 10')).toBeInTheDocument();
  });
});
