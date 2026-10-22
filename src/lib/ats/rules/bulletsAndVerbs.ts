import type { AtsIssue, AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { escapeRegExp, normalize, splitLines } from '../text';
import { RULE_WEIGHTS } from './weights';

export const BULLET_PATTERN = /^\s*(?:[•\-*▪●◦‣–·]|\d+[.)])\s+/;

/** Common action verbs in English and Indonesian. */
export const ACTION_VERBS = [
  // English
  'achieved',
  'built',
  'created',
  'delivered',
  'designed',
  'developed',
  'improved',
  'implemented',
  'increased',
  'launched',
  'led',
  'managed',
  'migrated',
  'optimized',
  'reduced',
  'refactored',
  'resolved',
  'streamlined',
  'collaborated',
  'maintained',
  'automated',
  'integrated',
  'mentored',
  'coordinated',
  'analyzed',
  // Indonesian
  'membangun',
  'membuat',
  'mengembangkan',
  'merancang',
  'memimpin',
  'mengelola',
  'meningkatkan',
  'menurunkan',
  'mengurangi',
  'mengoptimalkan',
  'mengimplementasikan',
  'menerapkan',
  'meluncurkan',
  'memigrasikan',
  'mengintegrasikan',
  'menganalisis',
  'mengkoordinasikan',
  'berkolaborasi',
  'memelihara',
  'mengotomatisasi',
  'membimbing',
];

export const TARGET_BULLETS = 5;
export const TARGET_VERBS = 5;

export function countBullets(text: string): number {
  return splitLines(text).filter((line) => BULLET_PATTERN.test(line)).length;
}

/** Number of action verb occurrences (not unique). */
export function countActionVerbs(text: string): number {
  const normalized = normalize(text);
  return ACTION_VERBS.reduce((total, verb) => {
    const matches = normalized.match(new RegExp(`\\b${escapeRegExp(verb)}\\b`, 'g'));
    return total + (matches?.length ?? 0);
  }, 0);
}

/** Are achievements written as bullet points with strong verbs? */
export const checkBulletsAndVerbs: AtsRule = ({ text }) => {
  const bullets = countBullets(text);
  const verbs = countActionVerbs(text);
  const issues: AtsIssue[] = [];

  if (bullets < TARGET_BULLETS) {
    issues.push(
      createIssue(
        'bulletsAndVerbs',
        'bullets',
        'warning',
        bullets === 0
          ? 'Tidak ada bullet point yang terbaca.'
          : `Hanya ${bullets} bullet point yang terbaca.`,
        'Tulis tanggung jawab dan pencapaian sebagai bullet point (•) di bawah tiap pengalaman, bukan paragraf panjang.',
      ),
    );
  }
  if (verbs < TARGET_VERBS) {
    issues.push(
      createIssue(
        'bulletsAndVerbs',
        'verbs',
        'info',
        'Kata kerja aksi masih sedikit.',
        'Awali bullet dengan kata kerja seperti "Mengembangkan", "Meningkatkan", "Built", atau "Led".',
      ),
    );
  }

  const score =
    0.5 * Math.min(1, bullets / TARGET_BULLETS) + 0.5 * Math.min(1, verbs / TARGET_VERBS);

  return {
    id: 'bulletsAndVerbs',
    label: 'Bullet point & kata kerja aksi',
    weight: RULE_WEIGHTS.bulletsAndVerbs,
    score: Math.round(score * 100) / 100,
    issues,
  };
};
