import Chip from '@mui/material/Chip';
import { alpha, styled } from '@mui/material/styles';
import type { Severity } from '@/types/ats';

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<{ severity: Severity }>(({ theme, severity }) => {
  const color = {
    critical: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  }[severity];

  return {
    height: 24,
    fontSize: '0.72rem',
    letterSpacing: '0.02em',
    color,
    backgroundColor: alpha(color, 0.1),
    border: `1px solid ${alpha(color, 0.3)}`,
  };
});
