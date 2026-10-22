import Typography from '@mui/material/Typography';
import { ScoreBar } from '@/components/atoms';
import type { RuleResult } from '@/types/ats';
import { Points, Row, RowHeader } from './RuleScoreRow.styles';

export interface RuleScoreRowProps {
  rule: RuleResult;
}

/** One line of the breakdown: rule name, points earned, and a meter. */
export function RuleScoreRow({ rule }: RuleScoreRowProps) {
  const earned = Math.round(rule.score * rule.weight * 10) / 10;

  return (
    <Row>
      <RowHeader>
        <Typography variant="body2" fontWeight={600}>
          {rule.label}
        </Typography>
        <Points>
          {earned} / {rule.weight}
        </Points>
      </RowHeader>
      <ScoreBar value={rule.score} label={rule.label} />
    </Row>
  );
}
