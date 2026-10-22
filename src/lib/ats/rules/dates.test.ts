import { GOOD_CV_TEXT } from '../__fixtures__/sampleCv';
import { checkDates, detectDateFormats } from './dates';

const run = (text: string) => checkDates({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkDates', () => {
  it('detects month-name dates in Indonesian and English', () => {
    expect(detectDateFormats('Jan 2021 – Agustus 2022, Sept. 2023').monthName).toBe(3);
  });

  it('does not count a month-name range as a year-only range', () => {
    expect(detectDateFormats('Jan 2020 – Mar 2021').yearOnly).toBe(0);
  });

  it('detects year-only ranges', () => {
    expect(detectDateFormats('2019 - 2021\n2021 – Sekarang').yearOnly).toBe(2);
  });

  it('gives full score to the consistent sample CV', () => {
    expect(run(GOOD_CV_TEXT)?.score).toBe(1);
  });

  it('flags mixed formats', () => {
    const result = run('Jan 2021 – Mar 2022\n05/2019 - 12/2020');
    expect(result?.score).toBe(0.6);
    expect(result?.issues[0]?.id).toBe('dates:inconsistent');
  });

  it('flags missing dates', () => {
    expect(run('tidak ada tanggal')?.issues[0]?.id).toBe('dates:missing');
  });
});
