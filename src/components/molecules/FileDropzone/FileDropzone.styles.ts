import { alpha, styled } from '@mui/material/styles';
import { radii } from '@/theme';

export const DropArea = styled('label', {
  shouldForwardProp: (prop) => prop !== 'isDragging' && prop !== 'isDisabled',
})<{ isDragging: boolean; isDisabled: boolean }>(({ theme, isDragging, isDisabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  borderRadius: radii.lg,
  border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: isDragging
    ? alpha(theme.palette.primary.main, 0.06)
    : theme.palette.background.default,
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  opacity: isDisabled ? 0.6 : 1,
  transition: 'border-color 150ms, background-color 150ms',
  '&:hover': isDisabled ? {} : { borderColor: theme.palette.primary.main },
  '&:focus-within': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 },
}));

export const DropIcon = styled('div')(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
}));

export const HiddenInput = styled('input')({
  position: 'absolute',
  width: 1,
  height: 1,
  opacity: 0,
  overflow: 'hidden',
});
