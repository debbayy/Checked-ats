import { create } from 'zustand';
import { analyzeCv } from '@/lib/ats';
import type { AnalysisState, AnalysisStore } from './analysis.types';

export const initialAnalysisState: AnalysisState = {
  report: null,
};

export const useAnalysisStore = create<AnalysisStore>()((set) => ({
  ...initialAnalysisState,

  analyze: (input) => {
    const report = analyzeCv(input);
    set({ report });
    return report;
  },

  clear: () => set(initialAnalysisState),
}));
