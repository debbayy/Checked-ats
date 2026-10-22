import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { CheckerTemplate } from './CheckerTemplate';

describe('CheckerTemplate', () => {
  it('places the sidebar and the main content', () => {
    renderWithTheme(<CheckerTemplate sidebar={<p>kiri</p>}>kanan</CheckerTemplate>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toHaveTextContent('kiri');
    expect(screen.getByRole('main')).toHaveTextContent('kanan');
  });
});
