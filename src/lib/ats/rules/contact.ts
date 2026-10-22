import type { AtsIssue, AtsRule } from '@/types/ats';
import { createIssue } from '../issue';
import { RULE_WEIGHTS } from './weights';

export const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/;
/** Indonesian (+62 / 08..) and general international numbers. */
export const PHONE_PATTERN = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,5}/;
export const LINKEDIN_PATTERN = /linkedin\.com\/in\/[\w-]+/i;

/** Points per contact item; together they make 1. */
const CONTACT_POINTS = { email: 0.45, phone: 0.35, linkedin: 0.2 };

/** Can a recruiter reach the candidate? */
export const checkContact: AtsRule = ({ text }) => {
  const hasEmail = EMAIL_PATTERN.test(text);
  const hasPhone = PHONE_PATTERN.test(text);
  const hasLinkedin = LINKEDIN_PATTERN.test(text);
  const issues: AtsIssue[] = [];

  if (!hasEmail) {
    issues.push(
      createIssue(
        'contact',
        'email',
        'critical',
        'Email tidak terbaca.',
        'Tulis email sebagai teks biasa di bagian atas CV, bukan di header/footer atau di dalam ikon.',
      ),
    );
  }
  if (!hasPhone) {
    issues.push(
      createIssue(
        'contact',
        'phone',
        'warning',
        'Nomor HP tidak terbaca.',
        'Tulis nomor dengan format sederhana, misalnya +62 812 3456 7890.',
      ),
    );
  }
  if (!hasLinkedin) {
    issues.push(
      createIssue(
        'contact',
        'linkedin',
        'info',
        'URL LinkedIn tidak ditemukan.',
        'Tambahkan URL lengkap seperti linkedin.com/in/nama-kamu, jangan cuma ikon.',
      ),
    );
  }

  const score =
    (hasEmail ? CONTACT_POINTS.email : 0) +
    (hasPhone ? CONTACT_POINTS.phone : 0) +
    (hasLinkedin ? CONTACT_POINTS.linkedin : 0);

  return {
    id: 'contact',
    label: 'Info kontak',
    weight: RULE_WEIGHTS.contact,
    score: Math.round(score * 100) / 100,
    issues,
  };
};
