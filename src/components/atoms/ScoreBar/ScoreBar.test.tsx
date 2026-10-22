import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { ScoreBar } from './ScoreBar';

describe('ScoreBar', () => {
  it('exposes its value as a percentage', () => {
    renderWithTheme(<ScoreBar value={0.65} label="Kontak" />);
    expect(screen.getByRole('meter', { name: 'Kontak' })).toHaveAttribute('aria-valuenow', '65');
  });
});
