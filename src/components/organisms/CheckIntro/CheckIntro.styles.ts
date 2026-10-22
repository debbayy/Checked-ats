import { styled } from '@mui/material/styles';

export const CheckGrid = styled('ul')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const CheckItem = styled('li')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  padding: theme.spacing(1.25, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const Weight = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  color: theme.palette.primary.main,
  whiteSpace: 'nowrap',
}));
