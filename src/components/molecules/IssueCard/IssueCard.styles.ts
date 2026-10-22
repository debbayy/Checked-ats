import { styled } from '@mui/material/styles';
import type { Severity } from '@/types/ats';

export const IssueRoot = styled('li', {
  shouldForwardProp: (prop) => prop !== 'severity',
})<{ severity: Severity }>(({ theme, severity }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
  padding: theme.spacing(1.75, 2),
  listStyle: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  // A thin severity marker on the left edge, so critical items stand out when scanning.
  boxShadow: `inset 3px 0 0 ${
    {
      critical: theme.palette.error.main,
      warning: theme.palette.warning.main,
      info: theme.palette.info.main,
    }[severity]
  }`,
  '&:last-of-type': { borderBottom: 'none' },
}));

export const IssueHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));
