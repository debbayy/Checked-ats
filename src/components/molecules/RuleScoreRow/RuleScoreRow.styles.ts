import { styled } from '@mui/material/styles';

export const Row = styled('li')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
  listStyle: 'none',
}));

export const RowHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: theme.spacing(2),
}));

export const Points = styled('span')(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
}));
