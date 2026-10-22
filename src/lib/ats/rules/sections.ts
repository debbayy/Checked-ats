import type { AtsIssue, AtsRule, Severity } from '@/types/ats';
import { createIssue } from '../issue';
import { normalize, splitLines } from '../text';
import { RULE_WEIGHTS } from './weights';

interface SectionDefinition {
  key: string;
  name: string;
  severity: Severity;
  /** Accepted headings, lowercase, Indonesian and English. */
  headings: string[];
}

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    key: 'experience',
    name: 'Pengalaman Kerja / Experience',
    severity: 'warning',
    headings: [
      'experience',
      'work experience',
      'professional experience',
      'employment history',
      'work history',
      'pengalaman',
      'pengalaman kerja',
      'pengalaman profesional',
      'riwayat pekerjaan',
    ],
  },
  {
    key: 'education',
    name: 'Pendidikan / Education',
    severity: 'warning',
    headings: ['education', 'academic background', 'pendidikan', 'riwayat pendidikan'],
  },
  {
    key: 'skills',
    name: 'Keahlian / Skills',
    severity: 'warning',
    headings: [
      'skills',
      'technical skills',
      'core skills',
      'skills & tools',
      'keahlian',
      'keterampilan',
      'kemampuan',
      'skill',
    ],
  },
  {
    key: 'summary',
    name: 'Ringkasan / Summary',
    severity: 'info',
    headings: [
      'summary',
      'professional summary',
      'profile',
      'about me',
      'objective',
      'ringkasan',
      'profil',
      'profil singkat',
      'tentang saya',
    ],
  },
];

/** A heading is a short line that starts with one of the accepted names. */
const MAX_HEADING_LENGTH = 40;

function isHeadingFor(line: string, headings: string[]): boolean {
  const cleaned = normalize(line)
    .replace(/[:|•\-–—]+$/g, '')
    .trim();
  if (cleaned.length === 0 || cleaned.length > MAX_HEADING_LENGTH) return false;
  return headings.some((heading) => cleaned === heading || cleaned.startsWith(`${heading} `));
}

/** Detect which standard sections exist in the CV. */
export function findSections(text: string): Record<string, boolean> {
  const lines = splitLines(text);
  return Object.fromEntries(
    SECTION_DEFINITIONS.map((section) => [
      section.key,
      lines.some((line) => isHeadingFor(line, section.headings)),
    ]),
  );
}

/** Does the CV use section headings an ATS can recognise? */
export const checkSections: AtsRule = ({ text }) => {
  const found = findSections(text);
  const issues: AtsIssue[] = [];

  for (const section of SECTION_DEFINITIONS) {
    if (!found[section.key]) {
      issues.push(
        createIssue(
          'sections',
          section.key,
          section.severity,
          `Bagian "${section.name}" tidak ditemukan.`,
          `Tambahkan heading standar seperti "${section.headings[0]}" atau "${section.headings.at(-1)}". Hindari judul kreatif yang tidak dikenali ATS.`,
        ),
      );
    }
  }

  const foundCount = Object.values(found).filter(Boolean).length;

  return {
    id: 'sections',
    label: 'Heading bagian standar',
    weight: RULE_WEIGHTS.sections,
    score: foundCount / SECTION_DEFINITIONS.length,
    issues,
  };
};
