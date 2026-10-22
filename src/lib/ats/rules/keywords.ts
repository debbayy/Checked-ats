import type { AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { tokenize } from '../text';
import { RULE_WEIGHTS } from './weights';

/** Words that say nothing about the job itself (EN + ID). */
const STOPWORDS = new Set([
  // English
  'the',
  'and',
  'for',
  'with',
  'you',
  'your',
  'our',
  'are',
  'will',
  'have',
  'has',
  'this',
  'that',
  'from',
  'into',
  'able',
  'who',
  'what',
  'about',
  'can',
  'all',
  'any',
  'job',
  'role',
  'work',
  'team',
  'teams',
  'years',
  'year',
  'experience',
  'strong',
  'good',
  'skills',
  'skill',
  'knowledge',
  'ability',
  'must',
  'plus',
  'etc',
  'including',
  'such',
  'other',
  'well',
  'more',
  'using',
  'use',
  'responsibilities',
  'requirements',
  'qualifications',
  'preferred',
  'least',
  'minimum',
  'new',
  'looking',
  'join',
  'company',
  'candidate',
  'build',
  'help',
  'within',
  'across',
  'also',
  'not',
  // Indonesian
  'dan',
  'yang',
  'untuk',
  'dengan',
  'atau',
  'dalam',
  'pada',
  'dari',
  'ini',
  'itu',
  'akan',
  'kami',
  'anda',
  'kamu',
  'adalah',
  'sebagai',
  'serta',
  'memiliki',
  'mampu',
  'bisa',
  'dapat',
  'minimal',
  'tahun',
  'pengalaman',
  'kemampuan',
  'baik',
  'lebih',
  'diutamakan',
  'kualifikasi',
  'persyaratan',
  'tanggung',
  'jawab',
  'tim',
  'kerja',
  'bekerja',
  'posisi',
  'perusahaan',
  'kandidat',
  'menjadi',
  'oleh',
  'juga',
  'tidak',
  'sama',
  'terhadap',
  'secara',
  'agar',
  'bagi',
]);

export const MAX_KEYWORDS = 25;

/** Most frequent meaningful words in a job description. */
export function extractKeywords(jobDescription: string): string[] {
  const frequency = new Map<string, number>();

  for (const token of tokenize(jobDescription)) {
    if (STOPWORDS.has(token)) continue;
    if (/^\d+$/.test(token)) continue;
    // Short tokens only count when they look technical, e.g. "ui", "go", "c#".
    if (token.length < 3 && !/[#+.]/.test(token) && !/^(ui|ux|qa|go|ai|ml|hr)$/.test(token))
      continue;
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, MAX_KEYWORDS)
    .map(([token]) => token);
}

/** How well does the CV cover the keywords of the job description? */
export const checkKeywords: AtsRule = ({ text, jobDescription }) => {
  if (!jobDescription || jobDescription.trim().length === 0) return null;

  const keywords = extractKeywords(jobDescription);
  if (keywords.length === 0) return null;

  const cvTokens = new Set(tokenize(text));
  const matched = keywords.filter((keyword) => cvTokens.has(keyword));
  const missing = keywords.filter((keyword) => !cvTokens.has(keyword));
  const score = matched.length / keywords.length;

  const issues =
    score < 0.6
      ? [
          createIssue(
            'keywords',
            'missing',
            score < 0.3 ? 'critical' : 'warning',
            `Baru ${matched.length} dari ${keywords.length} keyword lowongan yang ada di CV.`,
            `Kalau memang relevan dengan pengalaman kamu, masukkan keyword seperti: ${missing.slice(0, 8).join(', ')}.`,
          ),
        ]
      : [];

  return {
    id: 'keywords',
    label: 'Kecocokan keyword lowongan',
    weight: RULE_WEIGHTS.keywords,
    score: Math.round(score * 100) / 100,
    issues,
    details: { keywords: { matched, missing } },
  };
};
