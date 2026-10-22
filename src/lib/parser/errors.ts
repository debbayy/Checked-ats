export type CvParseErrorCode = 'unsupportedType' | 'emptyFile' | 'tooLarge' | 'parseFailed';

/** Human-readable (Indonesian) messages for every parse error. */
export const PARSE_ERROR_MESSAGES: Record<CvParseErrorCode, string> = {
  unsupportedType: 'Format file belum didukung. Upload CV dalam bentuk PDF atau DOCX.',
  emptyFile: 'File kosong. Coba ekspor ulang CV kamu lalu upload lagi.',
  tooLarge: 'File lebih dari 10 MB. Kompres dulu CV kamu lalu upload lagi.',
  parseFailed: 'File tidak bisa dibaca. Pastikan file tidak rusak atau dikunci password.',
};

export class CvParseError extends Error {
  readonly code: CvParseErrorCode;

  constructor(code: CvParseErrorCode) {
    super(PARSE_ERROR_MESSAGES[code]);
    this.name = 'CvParseError';
    this.code = code;
  }
}
