import type { AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { RULE_WEIGHTS } from './weights';

const MONTHS =
  'jan(?:uary|uari)?|feb(?:ruary|ruari)?|mar(?:ch|et)?|apr(?:il)?|may|mei|jun(?:e|i)?|jul(?:y|i)?|aug(?:ust)?|agu(?:stus)?|ags|sep(?:t(?:ember)?)?|oct(?:ober)?|okt(?:ober)?|nov(?:ember)?|dec(?:ember)?|des(?:ember)?';

const YEAR = '(?:19|20)\\d{2}';
const ONGOING = 'present|sekarang|now|saat ini|current';

/** "Jan 2021", "Januari 2021", "Sept. 2021" */
const MONTH_NAME_DATE = new RegExp(`\\b(?:${MONTHS})\\.?\\s+${YEAR}\\b`, 'gi');
/** "01/2021", "1-2021", "2021-01" */
const NUMERIC_DATE = new RegExp(
  `\\b(?:(?:0?[1-9]|1[0-2])[/.-]${YEAR}|${YEAR}[/.-](?:0[1-9]|1[0-2]))\\b`,
  'gi',
);
/** "2019 - 2021" or "2019 – Sekarang", where the start year has no month in front. */
const YEAR_ONLY_RANGE = new RegExp(
  `(?<![A-Za-z]\\.?\\s)(?<![/.\\-\\d])\\b${YEAR}\\s*[-–—]\\s*(?:${YEAR}|${ONGOING})\\b`,
  'gi',
);

export type DateFormat = 'monthName' | 'numeric' | 'yearOnly';

/** Count how often each date style appears. */
export function detectDateFormats(text: string): Record<DateFormat, number> {
  return {
    monthName: text.match(MONTH_NAME_DATE)?.length ?? 0,
    numeric: text.match(NUMERIC_DATE)?.length ?? 0,
    yearOnly: text.match(YEAR_ONLY_RANGE)?.length ?? 0,
  };
}

/** Are dates present and written in one consistent style? */
export const checkDates: AtsRule = ({ text }) => {
  const formats = detectDateFormats(text);
  const usedFormats = Object.values(formats).filter((count) => count > 0).length;
  const base = { id: 'dates', label: 'Format tanggal', weight: RULE_WEIGHTS.dates } as const;

  if (usedFormats === 0) {
    return {
      ...base,
      score: 0,
      issues: [
        createIssue(
          'dates',
          'missing',
          'warning',
          'Tanggal pengalaman/pendidikan tidak terbaca.',
          'Cantumkan periode tiap pengalaman, misalnya "Jan 2021 – Mar 2023".',
        ),
      ],
    };
  }

  if (usedFormats === 1) return { ...base, score: 1, issues: [] };

  return {
    ...base,
    score: usedFormats === 2 ? 0.6 : 0.3,
    issues: [
      createIssue(
        'dates',
        'inconsistent',
        'warning',
        'Format tanggal tidak konsisten.',
        'Pakai satu format saja di seluruh CV, misalnya selalu "Jan 2021 – Mar 2023".',
      ),
    ],
  };
};
