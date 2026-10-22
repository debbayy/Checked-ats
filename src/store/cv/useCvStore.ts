import { create } from 'zustand';
import { CvParseError, PARSE_ERROR_MESSAGES, parseCvFile } from '@/lib/parser';
import type { CvState, CvStore } from './cv.types';

export const initialCvState: CvState = {
  file: null,
  parsed: null,
  status: 'idle',
  errorMessage: null,
  jobDescription: '',
};

export const useCvStore = create<CvStore>()((set) => ({
  ...initialCvState,

  loadCv: async (file) => {
    set({
      file: { name: file.name, sizeBytes: file.size },
      parsed: null,
      status: 'parsing',
      errorMessage: null,
    });

    try {
      const parsed = await parseCvFile(file);
      set({ parsed, status: 'ready' });
      return parsed;
    } catch (error) {
      const errorMessage =
        error instanceof CvParseError ? error.message : PARSE_ERROR_MESSAGES.parseFailed;
      set({ status: 'error', errorMessage });
      return null;
    }
  },

  setJobDescription: (jobDescription) => set({ jobDescription }),

  // Keep the job description: people often check several CVs against the same job.
  reset: () => set((state) => ({ ...initialCvState, jobDescription: state.jobDescription })),
}));
