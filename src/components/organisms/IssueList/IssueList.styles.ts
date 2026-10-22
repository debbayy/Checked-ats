import { styled } from '@mui/material/styles';
import { radii } from '@/theme';

export const IssueListRoot = styled('ul')(({ theme }) => ({
  margin: 0,
  padding: 0,
  borderRadius: radii.md,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));
