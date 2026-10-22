import { SEVERITY_LABELS } from '@/lib/format';
import type { Severity } from '@/types/ats';
import { StyledChip } from './SeverityChip.styles';

export interface SeverityChipProps {
  severity: Severity;
}

export function SeverityChip({ severity }: SeverityChipProps) {
  return <StyledChip severity={severity} label={SEVERITY_LABELS[severity]} size="small" />;
}
