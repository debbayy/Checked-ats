import { styled } from '@mui/material/styles';

export const KeywordColumns = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2.5),
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
}));
