import { GOOD_CV_TEXT } from '../__fixtures__/sampleCv';
import { checkBulletsAndVerbs, countActionVerbs, countBullets } from './bulletsAndVerbs';

const run = (text: string) => checkBulletsAndVerbs({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkBulletsAndVerbs', () => {
  it('counts bullet styles', () => {
    expect(countBullets('• satu\n- dua\n* tiga\n1. empat\nbukan bullet')).toBe(4);
  });

  it('counts action verbs in both languages', () => {
    expect(countActionVerbs('Built a thing. Mengembangkan fitur. Led the team.')).toBe(3);
  });

  it('gives full score to the sample CV', () => {
    expect(run(GOOD_CV_TEXT)?.score).toBe(1);
  });

  it('flags a CV written as paragraphs', () => {
    const result = run('Saya bekerja di perusahaan A dan bertugas di bagian frontend.');
    expect(result?.score).toBe(0);
    expect(result?.issues.map((issue) => issue.id)).toEqual([
      'bulletsAndVerbs:bullets',
      'bulletsAndVerbs:verbs',
    ]);
  });
});
