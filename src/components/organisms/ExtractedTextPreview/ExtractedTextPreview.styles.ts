import { styled } from '@mui/material/styles';
import { fonts, radii } from '@/theme';

export const TextBlock = styled('pre')(({ theme }) => ({
  margin: 0,
  maxHeight: 420,
  overflow: 'auto',
  padding: theme.spacing(2),
  borderRadius: radii.md,
  backgroundColor: theme.palette.background.default,
  fontFamily: fonts.mono,
  fontSize: '0.8rem',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));
