import { checkContact } from './contact';

const run = (text: string) => checkContact({ text, fileType: 'pdf', fileSizeBytes: 1 });

describe('checkContact', () => {
  it('scores full when email, phone and LinkedIn exist', () => {
    const result = run('a@b.com | 0812-3456-7890 | linkedin.com/in/rina');
    expect(result?.score).toBe(1);
    expect(result?.issues).toHaveLength(0);
  });

  it('marks a missing email as critical', () => {
    const result = run('+62 812 3456 7890 linkedin.com/in/rina');
    expect(result?.score).toBe(0.55);
    expect(result?.issues[0]).toMatchObject({ id: 'contact:email', severity: 'critical' });
  });

  it('reports every missing item', () => {
    expect(run('Nama saja')?.issues.map((issue) => issue.id)).toEqual([
      'contact:email',
      'contact:phone',
      'contact:linkedin',
    ]);
  });
});
