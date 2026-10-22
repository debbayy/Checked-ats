import { screen } from '@testing-library/react';
import { renderWithTheme } from '@/test/renderWithTheme';
import { KeywordMatchPanel } from './KeywordMatchPanel';

describe('KeywordMatchPanel', () => {
  it('summarises matched and missing keywords', () => {
    renderWithTheme(
      <KeywordMatchPanel keywords={{ matched: ['react'], missing: ['docker', 'aws'] }} />,
    );
    expect(screen.getByText(/1 dari 3 keyword/)).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('docker')).toBeInTheDocument();
  });
});
