import { buildLines } from './parsePdf';

describe('buildLines', () => {
  it('groups items into lines from top to bottom', () => {
    const lines = buildLines([
      { str: 'World', x: 60, y: 700, width: 30 },
      { str: 'Hello', x: 10, y: 701, width: 40 },
      { str: 'Next line', x: 10, y: 680, width: 50 },
    ]);
    expect(lines).toEqual(['Hello World', 'Next line']);
  });

  it('keeps wide gaps so column layouts are detectable', () => {
    const [line] = buildLines([
      { str: 'Pengalaman', x: 10, y: 700, width: 60 },
      { str: 'Keahlian', x: 300, y: 700, width: 50 },
    ]);
    expect(line).toBe('Pengalaman    Keahlian');
  });
});
