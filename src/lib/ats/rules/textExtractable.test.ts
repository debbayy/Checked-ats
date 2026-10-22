import { GOOD_CV_TEXT } from '../__fixtures__/sampleCv';
import { checkTextExtractable } from './textExtractable';

const run = (text: string) =>
  checkTextExtractable({ text, fileType: 'pdf', fileSizeBytes: 100_000 });

describe('checkTextExtractable', () => {
  it('gives full score to a readable CV', () => {
    expect(run(GOOD_CV_TEXT)?.score).toBe(1);
  });

  it('flags an image/scan CV as critical', () => {
    const result = run('Rina Pratama CV');
    expect(result?.score).toBe(0);
    expect(result?.issues[0]?.severity).toBe('critical');
  });

  it('gives half score when only a little text is readable', () => {
    const text = Array.from({ length: 60 }, (_, i) => `kata${i}`).join(' ');
    expect(run(text)?.score).toBe(0.5);
  });
});
