import { styled } from '@mui/material/styles';

export const PageShell = styled('div')(({ theme }) => ({
  maxWidth: 1180,
  margin: '0 auto',
  paddingBlock: theme.spacing(4, 8),
  paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
  paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
  [theme.breakpoints.up('md')]: { paddingBlock: theme.spacing(6, 10) },
}));

export const Header = styled('header')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  maxWidth: 680,
  marginBottom: theme.spacing(4),
}));

export const Brand = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  fontWeight: 700,
  letterSpacing: '0.08em',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
}));

export const Columns = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  alignItems: 'start',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(300px, 380px) minmax(0, 1fr)',
  },
}));

export const Sidebar = styled('aside')(({ theme }) => ({
  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: `calc(${theme.spacing(3)} + env(safe-area-inset-top, 0px))`,
  },
}));

export const Main = styled('main')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  minWidth: 0,
}));
