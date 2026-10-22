import { checkFileSize } from './fileSize';

const MB = 1024 * 1024;
const run = (fileSizeBytes: number) => checkFileSize({ text: '', fileType: 'pdf', fileSizeBytes });

describe('checkFileSize', () => {
  it('scores by file size', () => {
    expect(run(500 * 1024)?.score).toBe(1);
    expect(run(3 * MB)?.score).toBe(0.5);
    expect(run(6 * MB)?.score).toBe(0);
  });

  it('marks oversized files as critical', () => {
    expect(run(6 * MB)?.issues[0]?.severity).toBe('critical');
  });
});
