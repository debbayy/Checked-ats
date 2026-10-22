import { styled } from '@mui/material/styles';

export const OverviewLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

export const OverviewText = styled('div')(({ theme }) => ({
  flex: '1 1 240px',
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing(1),
}));

export const StatRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  fontVariantNumeric: 'tabular-nums',
}));
