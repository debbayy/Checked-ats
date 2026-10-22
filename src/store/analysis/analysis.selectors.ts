import type { AnalysisStore } from './analysis.types';

export const selectReport = (state: AnalysisStore) => state.report;
export const selectHasReport = (state: AnalysisStore) => state.report !== null;
export const selectKeywordMatch = (state: AnalysisStore) =>
  state.report?.rules.find((rule) => rule.id === 'keywords')?.details?.keywords ?? null;
