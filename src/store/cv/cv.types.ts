import type { ParsedCv } from '@/lib/parser';

/** Where we are in reading the uploaded CV. */
export type CvStatus = 'idle' | 'parsing' | 'ready' | 'error';

export interface CvFileInfo {
  name: string;
  sizeBytes: number;
}

export interface CvState {
  file: CvFileInfo | null;
  parsed: ParsedCv | null;
  status: CvStatus;
  errorMessage: string | null;
  jobDescription: string;
}

export interface CvActions {
  /** Read the file in the browser. Returns the parsed CV, or null if it failed. */
  loadCv: (file: File) => Promise<ParsedCv | null>;
  setJobDescription: (jobDescription: string) => void;
  reset: () => void;
}

export type CvStore = CvState & CvActions;
