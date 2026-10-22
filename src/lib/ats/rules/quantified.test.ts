import { checkQuantified, countMetrics } from './quantified';

const run = (text: string) => checkQuantified({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkQuantified', () => {
  it('detects common metric styles', () => {
    expect(countMetrics('naik 40% · 10.000+ pengguna · 3x lebih cepat · 2 juta transaksi')).toBe(4);
  });

  it('ignores plain years', () => {
    expect(countMetrics('Jan 2021 – Des 2023')).toBe(0);
  });

  it('scores by number of metrics', () => {
    expect(run('naik 40%, 20%, dan 10%')?.score).toBe(1);
    expect(run('naik 40%')?.score).toBe(0.5);
    expect(run('tanpa angka')?.score).toBe(0);
  });
});
