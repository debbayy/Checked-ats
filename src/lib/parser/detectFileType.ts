import type { CvFileType } from '@/types/ats';

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

/** Work out the CV type from its MIME type, falling back to the extension. */
export function detectFileType(file: Pick<File, 'name' | 'type'>): CvFileType | null {
  const name = file.name.toLowerCase();
  if (file.type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
  if (file.type === DOCX_MIME || name.endsWith('.docx')) return 'docx';
  return null;
}

export const ACCEPTED_FILE_TYPES = `.pdf,.docx,application/pdf,${DOCX_MIME}`;
