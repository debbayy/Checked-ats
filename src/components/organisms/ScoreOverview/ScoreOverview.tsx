import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Panel, ScoreDial } from '@/components/atoms';
import { VERDICT_DESCRIPTIONS, VERDICT_LABELS } from '@/lib/format';
import type { AtsReport } from '@/types/ats';
import { OverviewLayout, OverviewText, StatRow } from './ScoreOverview.styles';

export interface ScoreOverviewProps {
  report: AtsReport;
}

export function ScoreOverview({ report }: ScoreOverviewProps) {
  const criticalCount = report.issues.filter((issue) => issue.severity === 'critical').length;

  return (
    <Panel aria-label="Skor ATS">
      <OverviewLayout>
        <ScoreDial score={report.totalScore} verdict={report.verdict} />
        <OverviewText>
          <Typography variant="overline" color="text.secondary">
            Skor ATS
          </Typography>
          <Typography variant="h1" component="p">
            {VERDICT_LABELS[report.verdict]}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {VERDICT_DESCRIPTIONS[report.verdict]}
          </Typography>
          <StatRow>
            <span>{report.wordCount} kata terbaca</span>
            <span>{report.issues.length} catatan</span>
            <span>{criticalCount} kritis</span>
          </StatRow>
        </OverviewText>
      </OverviewLayout>
      <Alert severity="info" variant="outlined">
        Skor ini estimasi berdasarkan aturan umum yang dipakai banyak ATS, bukan skor resmi dari ATS
        tertentu seperti Workday, Greenhouse, atau Taleo.
      </Alert>
    </Panel>
  );
}
