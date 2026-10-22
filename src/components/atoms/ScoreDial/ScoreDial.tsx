import { useTheme } from '@mui/material/styles';
import type { Verdict } from '@/types/ats';
import {
  DialCenter,
  DialNumber,
  DialRoot,
  DialSvg,
  DialTrack,
  DialUnit,
  DialValue,
} from './ScoreDial.styles';

export interface ScoreDialProps {
  /** 0–100 */
  score: number;
  verdict: Verdict;
}

const RADIUS = 70;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular gauge showing the total ATS score. */
export function ScoreDial({ score, verdict }: ScoreDialProps) {
  const theme = useTheme();
  const verdictColor = {
    good: theme.palette.success.main,
    fair: theme.palette.warning.main,
    poor: theme.palette.error.main,
  }[verdict];
  const clamped = Math.min(100, Math.max(0, score));

  return (
    <DialRoot role="img" aria-label={`Skor ATS ${clamped} dari 100`}>
      <DialSvg viewBox="0 0 168 168">
        <DialTrack cx="84" cy="84" r={RADIUS} strokeWidth={STROKE} />
        <DialValue
          cx="84"
          cy="84"
          r={RADIUS}
          strokeWidth={STROKE}
          stroke={verdictColor}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped / 100)}
        />
      </DialSvg>
      <DialCenter aria-hidden>
        <DialNumber>{clamped}</DialNumber>
        <DialUnit>dari 100</DialUnit>
      </DialCenter>
    </DialRoot>
  );
}
