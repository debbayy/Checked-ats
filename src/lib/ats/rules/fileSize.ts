import type { AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { RULE_WEIGHTS } from './weights';

const MB = 1024 * 1024;
export const FILE_SIZE_LIMITS = { warn: 2 * MB, max: 5 * MB };

function formatMb(bytes: number): string {
  return `${(bytes / MB).toFixed(1)} MB`;
}

/** Many job portals reject large uploads. */
export const checkFileSize: AtsRule = ({ fileSizeBytes }) => {
  const base = { id: 'fileSize', label: 'Ukuran file', weight: RULE_WEIGHTS.fileSize } as const;

  if (fileSizeBytes > FILE_SIZE_LIMITS.max) {
    return {
      ...base,
      score: 0,
      issues: [
        createIssue(
          'fileSize',
          'tooLarge',
          'critical',
          `File terlalu besar (${formatMb(fileSizeBytes)}).`,
          'Banyak portal kerja membatasi upload 2–5 MB. Kompres gambar atau ekspor ulang tanpa foto beresolusi tinggi.',
        ),
      ],
    };
  }

  if (fileSizeBytes > FILE_SIZE_LIMITS.warn) {
    return {
      ...base,
      score: 0.5,
      issues: [
        createIssue(
          'fileSize',
          'large',
          'info',
          `File cukup besar (${formatMb(fileSizeBytes)}).`,
          'Usahakan di bawah 2 MB supaya aman di semua portal kerja.',
        ),
      ],
    };
  }

  return { ...base, score: 1, issues: [] };
};
