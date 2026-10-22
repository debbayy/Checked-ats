import type { AtsInput, AtsReport } from '@/types/ats';

export interface AnalysisState {
  report: AtsReport | null;
}

export interface AnalysisActions {
  /** Score a CV and store the report. */
  analyze: (input: AtsInput) => AtsReport;
  clear: () => void;
}

export type AnalysisStore = AnalysisState & AnalysisActions;
