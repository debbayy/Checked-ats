import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { SeverityChip } from './SeverityChip';

describe('SeverityChip', () => {
  it.each([
    ['critical', 'Kritis'],
    ['warning', 'Perlu dicek'],
    ['info', 'Saran'],
  ] as const)('shows the label for %s', (severity, label) => {
    renderWithTheme(<SeverityChip severity={severity} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
