import { GOOD_CV_TEXT } from '../__fixtures__/sampleCv';
import { checkSections, findSections } from './sections';

const run = (text: string) => checkSections({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkSections', () => {
  it('finds all Indonesian section headings', () => {
    expect(findSections(GOOD_CV_TEXT)).toEqual({
      experience: true,
      education: true,
      skills: true,
      summary: true,
    });
    expect(run(GOOD_CV_TEXT)?.score).toBe(1);
  });

  it('recognises English headings with a trailing colon', () => {
    const text = 'WORK EXPERIENCE:\nfoo\nEducation\nbar\nTechnical Skills\nbaz';
    expect(findSections(text)).toMatchObject({ experience: true, education: true, skills: true });
  });

  it('ignores the heading word when it is inside a long sentence', () => {
    const text = 'I have a lot of experience in building web applications for many companies';
    expect(findSections(text).experience).toBe(false);
  });

  it('reports each missing section', () => {
    const result = run('Pengalaman Kerja\nsesuatu');
    expect(result?.score).toBe(0.25);
    expect(result?.issues.map((issue) => issue.id)).toEqual([
      'sections:education',
      'sections:skills',
      'sections:summary',
    ]);
  });
});
