import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { ScoreDial } from './ScoreDial';

describe('ScoreDial', () => {
  it('shows the score and an accessible label', () => {
    renderWithTheme(<ScoreDial score={82} verdict="good" />);
    expect(screen.getByRole('img', { name: 'Skor ATS 82 dari 100' })).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument();
  });

  it('clamps scores outside 0–100', () => {
    renderWithTheme(<ScoreDial score={140} verdict="good" />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
