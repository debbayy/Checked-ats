import Chip from '@mui/material/Chip';
import { alpha, styled } from '@mui/material/styles';

export const ChipList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
  margin: 0,
  padding: 0,
  listStyle: 'none',
}));

export const KeywordChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'found',
})<{ found: boolean }>(({ theme, found }) => {
  const color = found ? theme.palette.success.main : theme.palette.text.secondary;
  return {
    fontFamily: 'inherit',
    color,
    backgroundColor: found ? alpha(color, 0.1) : 'transparent',
    border: `1px ${found ? 'solid' : 'dashed'} ${alpha(color, 0.45)}`,
  };
});
