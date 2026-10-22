import type { Severity, Verdict } from '@/types/ats';

export const VERDICT_LABELS: Record<Verdict, string> = {
  good: 'Ramah ATS',
  fair: 'Perlu perbaikan',
  poor: 'Belum ramah ATS',
};

export const VERDICT_DESCRIPTIONS: Record<Verdict, string> = {
  good: 'CV kamu kemungkinan besar terbaca dengan baik oleh ATS. Tinggal poles detail kecilnya.',
  fair: 'Sebagian besar CV terbaca, tapi ada beberapa hal yang bisa bikin CV kamu kalah di penyaringan.',
  poor: 'Banyak bagian CV yang berisiko tidak terbaca ATS. Perbaiki masalah kritis dulu.',
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  critical: 'Kritis',
  warning: 'Perlu dicek',
  info: 'Saran',
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
