import { BarFill, BarTrack } from './ScoreBar.styles';

export interface ScoreBarProps {
  /** 0–1 */
  value: number;
  label: string;
}

/** Thin horizontal meter. Color follows the value: red, amber, green. */
export function ScoreBar({ value, label }: ScoreBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <BarTrack
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
    >
      <BarFill value={clamped} />
    </BarTrack>
  );
}
