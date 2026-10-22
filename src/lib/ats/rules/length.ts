import type { AtsIssue, AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { countWords } from '../text';
import { RULE_WEIGHTS } from './weights';

export const IDEAL_WORDS = { min: 300, max: 900 };
export const ACCEPTABLE_WORDS = { min: 200, max: 1300 };
export const MAX_PAGES = 2;

/** Is the CV a reasonable length? */
export const checkLength: AtsRule = ({ text, pageCount }) => {
  const words = countWords(text);
  const issues: AtsIssue[] = [];
  let score: number;

  if (words >= IDEAL_WORDS.min && words <= IDEAL_WORDS.max) {
    score = 1;
  } else if (words >= ACCEPTABLE_WORDS.min && words <= ACCEPTABLE_WORDS.max) {
    score = 0.6;
  } else {
    score = 0.2;
  }

  if (words < IDEAL_WORDS.min) {
    issues.push(
      createIssue(
        'length',
        'short',
        score === 0.2 ? 'warning' : 'info',
        `CV cukup pendek (${words} kata).`,
        `Idealnya ${IDEAL_WORDS.min}–${IDEAL_WORDS.max} kata. Tambahkan detail tanggung jawab dan pencapaian di tiap pengalaman.`,
      ),
    );
  } else if (words > IDEAL_WORDS.max) {
    issues.push(
      createIssue(
        'length',
        'long',
        score === 0.2 ? 'warning' : 'info',
        `CV cukup panjang (${words} kata).`,
        `Idealnya ${IDEAL_WORDS.min}–${IDEAL_WORDS.max} kata. Fokus ke pengalaman yang relevan dengan posisi yang dilamar.`,
      ),
    );
  }

  if (pageCount !== undefined && pageCount > MAX_PAGES) {
    score = Math.min(score, 0.6);
    issues.push(
      createIssue(
        'length',
        'pages',
        'warning',
        `CV ${pageCount} halaman.`,
        `Usahakan maksimal ${MAX_PAGES} halaman.`,
      ),
    );
  }

  return { id: 'length', label: 'Panjang CV', weight: RULE_WEIGHTS.length, score, issues };
};
