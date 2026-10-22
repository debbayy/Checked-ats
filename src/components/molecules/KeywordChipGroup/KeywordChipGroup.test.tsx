import { screen, within } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { KeywordChipGroup } from './KeywordChipGroup';

describe('KeywordChipGroup', () => {
  it('lists every keyword with a count', () => {
    renderWithTheme(
      <KeywordChipGroup title="Ada di CV" keywords={['react', 'typescript']} found />,
    );
    expect(screen.getByText('Ada di CV (2)')).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: 'Ada di CV' })).getAllByRole('listitem'),
    ).toHaveLength(2);
  });

  it('shows an empty message', () => {
    renderWithTheme(<KeywordChipGroup title="Belum ada" keywords={[]} found={false} />);
    expect(screen.getByText('Tidak ada.')).toBeInTheDocument();
  });
});
