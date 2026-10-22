import type { AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { countWords } from '../text';
import { RULE_WEIGHTS } from './weights';

/** Below this many words we assume the CV is an image or a scan. */
export const MIN_READABLE_WORDS = 30;
/** Below this many words the CV is readable but suspiciously thin. */
export const LOW_READABLE_WORDS = 150;

/** Can an ATS actually read text out of the file? */
export const checkTextExtractable: AtsRule = ({ text }) => {
  const words = countWords(text);
  const base = {
    id: 'textExtractable',
    label: 'Teks bisa dibaca ATS',
    weight: RULE_WEIGHTS.textExtractable,
  } as const;

  if (words < MIN_READABLE_WORDS) {
    return {
      ...base,
      score: 0,
      issues: [
        createIssue(
          'textExtractable',
          'unreadable',
          'critical',
          'Hampir tidak ada teks yang bisa dibaca dari file ini.',
          'Kemungkinan CV berupa gambar atau hasil scan. Buat ulang CV dari Word, Google Docs, atau Canva lalu ekspor sebagai PDF teks (bukan gambar).',
        ),
      ],
    };
  }

  if (words < LOW_READABLE_WORDS) {
    return {
      ...base,
      score: 0.5,
      issues: [
        createIssue(
          'textExtractable',
          'partial',
          'warning',
          `Cuma ${words} kata yang terbaca.`,
          'Cek apakah ada bagian CV yang berupa gambar, ikon, atau teks di dalam shape. Ubah jadi teks biasa.',
        ),
      ],
    };
  }

  return { ...base, score: 1, issues: [] };
};
