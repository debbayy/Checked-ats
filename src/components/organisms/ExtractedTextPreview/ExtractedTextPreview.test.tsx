import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/test/renderWithTheme';
import { ExtractedTextPreview } from './ExtractedTextPreview';

describe('ExtractedTextPreview', () => {
  it('reveals the extracted text when expanded', async () => {
    renderWithTheme(<ExtractedTextPreview text="Rina Pratama" />);
    await userEvent.click(screen.getByRole('button', { name: /Teks yang terbaca ATS/ }));
    expect(screen.getByText('Rina Pratama')).toBeVisible();
  });

  it('shows a placeholder for empty text', () => {
    renderWithTheme(<ExtractedTextPreview text="" />);
    expect(screen.getByText('(Tidak ada teks yang terbaca)')).toBeInTheDocument();
  });
});
