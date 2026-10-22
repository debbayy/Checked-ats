'use client';

import { createTheme } from '@mui/material/styles';
import { colors, fonts, radii } from './tokens';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.primary, light: colors.primarySoft, contrastText: '#FFFFFF' },
    secondary: { main: colors.highlight },
    success: { main: colors.good },
    warning: { main: colors.fair },
    error: { main: colors.poor },
    info: { main: colors.info },
    background: { default: colors.canvas, paper: colors.surface },
    text: { primary: colors.ink, secondary: colors.inkMuted },
    divider: colors.line,
  },
  shape: { borderRadius: radii.md },
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.display,
      fontWeight: 700,
      fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: { fontFamily: fonts.display, fontWeight: 650, fontSize: '1.25rem', lineHeight: 1.25 },
    h3: { fontFamily: fonts.display, fontWeight: 600, fontSize: '1.05rem' },
    body1: { fontSize: '0.98rem', lineHeight: 1.6 },
    body2: { fontSize: '0.88rem', lineHeight: 1.55 },
    overline: { fontWeight: 600, letterSpacing: '0.12em', fontSize: '0.72rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: radii.sm, paddingInline: 18 } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: `1px solid ${colors.line}` } },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: { border: 'none', backgroundColor: 'transparent', '&::before': { display: 'none' } },
      },
    },
  },
});
