import { checkLength } from './length';

const words = (count: number) => Array.from({ length: count }, () => 'kata').join(' ');
const run = (count: number, pageCount?: number) =>
  checkLength({ text: words(count), fileType: 'pdf', fileSizeBytes: 1, pageCount });

describe('checkLength', () => {
  it('gives full score inside the ideal range', () => {
    expect(run(500)?.score).toBe(1);
  });

  it('gives partial score for an acceptable but short CV', () => {
    const result = run(250);
    expect(result?.score).toBe(0.6);
    expect(result?.issues[0]?.id).toBe('length:short');
  });

  it('gives a low score for a very long CV', () => {
    expect(run(2000)?.score).toBe(0.2);
  });

  it('caps the score when there are too many pages', () => {
    const result = run(500, 4);
    expect(result?.score).toBe(0.6);
    expect(result?.issues.some((issue) => issue.id === 'length:pages')).toBe(true);
  });
});
