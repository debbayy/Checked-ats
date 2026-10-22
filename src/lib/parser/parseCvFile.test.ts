import { CvParseError } from './errors';
import { parseCvFile } from './parseCvFile';

vi.mock('./parsePdf', () => ({
  parsePdf: vi.fn(async () => ({ text: 'isi pdf', pageCount: 2 })),
}));
vi.mock('./parseDocx', () => ({
  parseDocx: vi.fn(async () => 'isi docx'),
}));

const makeFile = (name: string, content = 'x', type = '') => new File([content], name, { type });

describe('parseCvFile', () => {
  it('parses a PDF', async () => {
    await expect(parseCvFile(makeFile('cv.pdf'))).resolves.toEqual({
      text: 'isi pdf',
      fileType: 'pdf',
      pageCount: 2,
    });
  });

  it('parses a DOCX', async () => {
    await expect(parseCvFile(makeFile('cv.docx'))).resolves.toEqual({
      text: 'isi docx',
      fileType: 'docx',
    });
  });

  it('rejects unsupported files', async () => {
    await expect(parseCvFile(makeFile('cv.png', 'x', 'image/png'))).rejects.toMatchObject({
      code: 'unsupportedType',
    });
  });

  it('rejects empty files', async () => {
    const error = await parseCvFile(makeFile('cv.pdf', '')).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(CvParseError);
    expect(error).toMatchObject({ code: 'emptyFile' });
  });
});
