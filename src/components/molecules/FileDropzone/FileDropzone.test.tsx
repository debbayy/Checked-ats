import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@/test/renderWithTheme';
import { FileDropzone } from './FileDropzone';

const file = new File(['%PDF'], 'cv.pdf', { type: 'application/pdf' });

describe('FileDropzone', () => {
  it('calls onFileSelected when a file is picked', async () => {
    const onFileSelected = vi.fn();
    renderWithTheme(<FileDropzone accept=".pdf" onFileSelected={onFileSelected} />);

    await userEvent.upload(screen.getByLabelText('Pilih file CV'), file);

    expect(onFileSelected).toHaveBeenCalledWith(file);
  });

  it('accepts a dropped file', () => {
    const onFileSelected = vi.fn();
    renderWithTheme(<FileDropzone accept=".pdf" onFileSelected={onFileSelected} />);

    fireEvent.drop(screen.getByText(/Tarik CV ke sini/), { dataTransfer: { files: [file] } });

    expect(onFileSelected).toHaveBeenCalledWith(file);
  });

  it('ignores drops while disabled', () => {
    const onFileSelected = vi.fn();
    renderWithTheme(<FileDropzone accept=".pdf" disabled onFileSelected={onFileSelected} />);

    fireEvent.drop(screen.getByText(/Tarik CV ke sini/), { dataTransfer: { files: [file] } });

    expect(onFileSelected).not.toHaveBeenCalled();
  });
});
