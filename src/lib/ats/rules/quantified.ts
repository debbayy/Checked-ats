import type { AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { RULE_WEIGHTS } from './weights';

/** Numbers followed by a unit that signals a measurable result. */
export const METRIC_PATTERN =
  /\b\d+(?:[.,]\d+)?\s?(?:%|persen\b|x\b|k\b|\+|juta\b|jt\b|ribu\b|rb\b|million\b|users?\b|pengguna\b|clients?\b|klien\b|orang\b|transaksi\b|transactions?\b|ms\b|detik\b|seconds?\b)/gi;

export const TARGET_METRICS = 3;

export function countMetrics(text: string): number {
  return text.match(METRIC_PATTERN)?.length ?? 0;
}

/** Does the CV show measurable achievements? */
export const checkQuantified: AtsRule = ({ text }) => {
  const metrics = countMetrics(text);
  const base = {
    id: 'quantified',
    label: 'Pencapaian terukur',
    weight: RULE_WEIGHTS.quantified,
  } as const;

  if (metrics >= TARGET_METRICS) return { ...base, score: 1, issues: [] };

  return {
    ...base,
    score: metrics === 0 ? 0 : 0.5,
    issues: [
      createIssue(
        'quantified',
        'metrics',
        metrics === 0 ? 'warning' : 'info',
        metrics === 0
          ? 'Belum ada pencapaian yang pakai angka.'
          : `Baru ${metrics} pencapaian yang pakai angka.`,
        'Tambahkan hasil terukur, misalnya "Mempercepat load halaman 40%" atau "Dipakai 10.000+ pengguna".',
      ),
    ],
  };
};
