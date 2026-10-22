'use client';

import { useCallback } from 'react';
import type { ParsedCv } from '@/lib/parser';
import { useAnalysisStore, useCvStore } from '@/store';

/**
 * The one place where the two stores meet:
 * read a CV with the CV store, then score it with the analysis store.
 */
export function useCvCheck() {
  const loadCv = useCvStore((state) => state.loadCv);
  const resetCv = useCvStore((state) => state.reset);
  const analyze = useAnalysisStore((state) => state.analyze);
  const clearAnalysis = useAnalysisStore((state) => state.clear);

  const scoreCv = useCallback(
    (parsed: ParsedCv, fileSizeBytes: number) => {
      analyze({
        ...parsed,
        fileSizeBytes,
        jobDescription: useCvStore.getState().jobDescription,
      });
    },
    [analyze],
  );

  /** Upload flow: read the file, then score it. */
  const checkFile = useCallback(
    async (file: File) => {
      clearAnalysis();
      const parsed = await loadCv(file);
      if (parsed) scoreCv(parsed, file.size);
    },
    [clearAnalysis, loadCv, scoreCv],
  );

  /** Re-score the current CV, e.g. after the job description changed. */
  const recheck = useCallback(() => {
    const { parsed, file } = useCvStore.getState();
    if (parsed && file) scoreCv(parsed, file.sizeBytes);
  }, [scoreCv]);

  const startOver = useCallback(() => {
    resetCv();
    clearAnalysis();
  }, [resetCv, clearAnalysis]);

  return { checkFile, recheck, startOver };
}
