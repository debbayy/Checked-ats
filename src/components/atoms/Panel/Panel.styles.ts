import { styled } from '@mui/material/styles';
import { radii } from '@/theme';

export const PanelRoot = styled('section')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  minWidth: 0,
  padding: theme.spacing(2.5),
  borderRadius: radii.lg,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(3) },
}));
