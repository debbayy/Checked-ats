import type * as ParserModule from '@/lib/parser';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GOOD_CV_TEXT, JOB_DESCRIPTION } from '@/lib/ats/__fixtures__/sampleCv';
import { initialAnalysisState, initialCvState, useAnalysisStore, useCvStore } from '@/store';
import { renderWithTheme } from '@/test/renderWithTheme';
import { UploadPanel } from './UploadPanel';

const parseCvFile = vi.hoisted(() => vi.fn());

vi.mock('@/lib/parser', async (importOriginal) => ({
  ...(await importOriginal<typeof ParserModule>()),
  parseCvFile,
}));

const cvFile = new File(['%PDF'], 'cv-rina.pdf', { type: 'application/pdf' });

describe('UploadPanel', () => {
  beforeEach(() => {
    useCvStore.setState(initialCvState);
    useAnalysisStore.setState(initialAnalysisState);
    parseCvFile.mockReset();
  });

  it('reads and scores an uploaded CV', async () => {
    parseCvFile.mockResolvedValue({ text: GOOD_CV_TEXT, fileType: 'pdf', pageCount: 1 });
    renderWithTheme(<UploadPanel />);

    await userEvent.upload(screen.getByLabelText('Pilih file CV'), cvFile);

    expect(await screen.findByText('cv-rina.pdf')).toBeInTheDocument();
    await waitFor(() => expect(useAnalysisStore.getState().report?.verdict).toBe('good'));
  });

  it('shows an error when the file cannot be read', async () => {
    const { CvParseError } = await import('@/lib/parser');
    parseCvFile.mockRejectedValue(new CvParseError('parseFailed'));
    renderWithTheme(<UploadPanel />);

    await userEvent.upload(screen.getByLabelText('Pilih file CV'), cvFile);

    expect(await screen.findByRole('alert')).toHaveTextContent('File tidak bisa dibaca');
    expect(useAnalysisStore.getState().report).toBeNull();
  });

  it('re-scores with the job description', async () => {
    parseCvFile.mockResolvedValue({ text: GOOD_CV_TEXT, fileType: 'pdf', pageCount: 1 });
    renderWithTheme(<UploadPanel />);
    await userEvent.upload(screen.getByLabelText('Pilih file CV'), cvFile);
    await waitFor(() => expect(useAnalysisStore.getState().report).not.toBeNull());

    const textarea = screen.getByLabelText('Job description (opsional)');
    await userEvent.click(textarea);
    await userEvent.paste(JOB_DESCRIPTION);
    await userEvent.click(screen.getByRole('button', { name: 'Cek ulang dengan job description' }));

    const rules = useAnalysisStore.getState().report?.rules ?? [];
    expect(rules.some((rule) => rule.id === 'keywords')).toBe(true);
  });
});
