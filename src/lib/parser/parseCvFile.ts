import type { CvFileType } from '@/types/ats';
import { detectFileType } from './detectFileType';
import { CvParseError } from './errors';
import { parseDocx } from './parseDocx';
import { parsePdf } from './parsePdf';
import { readFileAsArrayBuffer } from './readFile';

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export interface ParsedCv {
  text: string;
  fileType: CvFileType;
  pageCount?: number;
}

/** Read a CV file in the browser and return its plain text. Nothing is uploaded. */
export async function parseCvFile(file: File): Promise<ParsedCv> {
  const fileType = detectFileType(file);
  if (!fileType) throw new CvParseError('unsupportedType');
  if (file.size === 0) throw new CvParseError('emptyFile');
  if (file.size > MAX_UPLOAD_BYTES) throw new CvParseError('tooLarge');

  try {
    const data = await readFileAsArrayBuffer(file);
    if (fileType === 'pdf') {
      const { text, pageCount } = await parsePdf(data);
      return { text, fileType, pageCount };
    }
    return { text: await parseDocx(data), fileType };
  } catch {
    throw new CvParseError('parseFailed');
  }
}
