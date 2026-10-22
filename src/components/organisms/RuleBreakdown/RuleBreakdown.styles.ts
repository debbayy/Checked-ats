import { styled } from '@mui/material/styles';

export const RuleList = styled('ul')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  margin: 0,
  padding: 0,
}));
