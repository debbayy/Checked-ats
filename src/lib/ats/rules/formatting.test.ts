import { GOOD_CV_TEXT } from '../__fixtures__/sampleCv';
import { checkFormatting, columnLineRatio, garbledRatio } from './formatting';

const run = (text: string) => checkFormatting({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkFormatting', () => {
  it('passes a clean single-column CV', () => {
    expect(run(GOOD_CV_TEXT)?.score).toBe(1);
  });

  it('detects garbled characters from icon fonts', () => {
    const text = ` rina@email.com (cid:12) (cid:13) +62 812`;
    expect(garbledRatio(text)).toBeGreaterThan(0.005);
    expect(run(text)?.issues[0]?.id).toBe('formatting:garbled');
  });

  it('detects two-column layouts', () => {
    const text =
      'Pengalaman        Keahlian\nPT A              React\nPT B              TypeScript';
    expect(columnLineRatio(text)).toBe(1);
    expect(run(text)?.score).toBe(0.6);
  });
});
