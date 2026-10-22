import type * as ParserModule from '@/lib/parser';
import { CvParseError } from '@/lib/parser';
import { selectIsParsing } from './cv.selectors';
import { initialCvState, useCvStore } from './useCvStore';

const parseCvFile = vi.hoisted(() => vi.fn());

vi.mock('@/lib/parser', async (importOriginal) => ({
  ...(await importOriginal<typeof ParserModule>()),
  parseCvFile,
}));

const file = new File(['x'], 'cv.pdf', { type: 'application/pdf' });

describe('useCvStore', () => {
  beforeEach(() => {
    useCvStore.setState(initialCvState);
    parseCvFile.mockReset();
  });

  it('stores the parsed CV after a successful upload', async () => {
    parseCvFile.mockResolvedValue({ text: 'isi', fileType: 'pdf', pageCount: 1 });

    const result = await useCvStore.getState().loadCv(file);

    expect(result).toEqual({ text: 'isi', fileType: 'pdf', pageCount: 1 });
    expect(useCvStore.getState()).toMatchObject({
      status: 'ready',
      file: { name: 'cv.pdf', sizeBytes: 1 },
      errorMessage: null,
    });
  });

  it('is in the parsing state while reading', () => {
    parseCvFile.mockReturnValue(new Promise(() => {}));
    void useCvStore.getState().loadCv(file);
    expect(selectIsParsing(useCvStore.getState())).toBe(true);
  });

  it('keeps a readable error message when parsing fails', async () => {
    parseCvFile.mockRejectedValue(new CvParseError('unsupportedType'));

    const result = await useCvStore.getState().loadCv(file);

    expect(result).toBeNull();
    expect(useCvStore.getState().status).toBe('error');
    expect(useCvStore.getState().errorMessage).toMatch(/PDF atau DOCX/);
  });

  it('keeps the job description on reset', () => {
    useCvStore.getState().setJobDescription('React developer');
    useCvStore.setState({ status: 'ready' });

    useCvStore.getState().reset();

    expect(useCvStore.getState()).toMatchObject({
      status: 'idle',
      jobDescription: 'React developer',
    });
  });
});
