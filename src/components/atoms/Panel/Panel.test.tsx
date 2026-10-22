import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { Panel } from './Panel';

describe('Panel', () => {
  it('renders a labelled section with its content', () => {
    renderWithTheme(
      <Panel title="Rincian skor" subtitle="Per kategori">
        isi
      </Panel>,
    );
    expect(screen.getByRole('region', { name: 'Rincian skor' })).toBeInTheDocument();
    expect(screen.getByText('Per kategori')).toBeInTheDocument();
    expect(screen.getByText('isi')).toBeInTheDocument();
  });
});
