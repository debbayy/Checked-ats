import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { CheckIntro } from './CheckIntro';

describe('CheckIntro', () => {
  it('lists every check with its weight', () => {
    renderWithTheme(<CheckIntro />);
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
    expect(screen.getByText('Email, nomor HP, LinkedIn')).toBeInTheDocument();
  });
});
