import type { AtsIssue, AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { splitLines } from '../text';
import { RULE_WEIGHTS } from './weights';

/** Private-use glyphs (icon fonts), replacement chars and pdf "(cid:12)" leftovers. */
const GARBLED_PATTERN = /[-�]|\(cid:\d+\)/g;
/** Two chunks of text separated by a wide gap or a tab: typical of columns or tables. */
const COLUMN_GAP_PATTERN = /\S(?: {4,}|\t)\S/;

export const GARBLED_RATIO_LIMIT = 0.005;
export const COLUMN_LINE_RATIO_LIMIT = 0.2;

export function garbledRatio(text: string): number {
  if (text.length === 0) return 0;
  return (text.match(GARBLED_PATTERN)?.length ?? 0) / text.length;
}

export function columnLineRatio(text: string): number {
  const lines = splitLines(text);
  if (lines.length === 0) return 0;
  return lines.filter((line) => COLUMN_GAP_PATTERN.test(line)).length / lines.length;
}

/** Does the layout survive text extraction cleanly? */
export const checkFormatting: AtsRule = ({ text }) => {
  const issues: AtsIssue[] = [];
  let score = 1;

  if (garbledRatio(text) > GARBLED_RATIO_LIMIT) {
    score -= 0.5;
    issues.push(
      createIssue(
        'formatting',
        'garbled',
        'critical',
        'Ada karakter aneh atau rusak saat teks diekstrak.',
        'Biasanya dari ikon, font dekoratif, atau simbol khusus. Pakai font standar (Arial, Calibri, Inter) dan ganti ikon dengan teks.',
      ),
    );
  }

  if (columnLineRatio(text) > COLUMN_LINE_RATIO_LIMIT) {
    score -= 0.4;
    issues.push(
      createIssue(
        'formatting',
        'columns',
        'warning',
        'Terindikasi layout dua kolom atau tabel.',
        'Banyak ATS membaca kolom dari kiri ke kanan sehingga isinya tercampur. Pakai layout satu kolom.',
      ),
    );
  }

  return {
    id: 'formatting',
    label: 'Layout & karakter',
    weight: RULE_WEIGHTS.formatting,
    score: Math.max(0, Math.round(score * 100) / 100),
    issues,
  };
};
