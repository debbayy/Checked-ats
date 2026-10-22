'use client';

import {
  selectCvText,
  selectKeywordMatch,
  selectReport,
  useAnalysisStore,
  useCvStore,
} from '@/store';
import { CheckIntro } from '../CheckIntro';
import { ExtractedTextPreview } from '../ExtractedTextPreview';
import { IssueList } from '../IssueList';
import { KeywordMatchPanel } from '../KeywordMatchPanel';
import { RuleBreakdown } from '../RuleBreakdown';
import { ScoreOverview } from '../ScoreOverview';

/** Right-hand column: what gets checked before upload, the full report after. */
export function ResultsView() {
  const report = useAnalysisStore(selectReport);
  const keywords = useAnalysisStore(selectKeywordMatch);
  const text = useCvStore(selectCvText);

  if (!report) return <CheckIntro />;

  return (
    <>
      <ScoreOverview report={report} />
      <IssueList issues={report.issues} />
      {keywords && <KeywordMatchPanel keywords={keywords} />}
      <RuleBreakdown rules={report.rules} />
      <ExtractedTextPreview text={text} />
    </>
  );
}
