import { styled } from '@mui/material/styles';
import { fonts } from '@/theme';

export const DialRoot = styled('div')({
  position: 'relative',
  width: 168,
  height: 168,
  flexShrink: 0,
});

export const DialSvg = styled('svg')({
  width: '100%',
  height: '100%',
  transform: 'rotate(-90deg)',
});

export const DialTrack = styled('circle')(({ theme }) => ({
  fill: 'none',
  stroke: theme.palette.divider,
}));

export const DialValue = styled('circle')({
  fill: 'none',
  strokeLinecap: 'round',
  transition: 'stroke-dashoffset 700ms ease-out',
});

export const DialCenter = styled('div')({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const DialNumber = styled('span')(({ theme }) => ({
  fontFamily: fonts.display,
  fontSize: '3rem',
  fontWeight: 700,
  lineHeight: 1,
  fontVariantNumeric: 'tabular-nums',
  color: theme.palette.text.primary,
}));

export const DialUnit = styled('span')(({ theme }) => ({
  marginTop: 4,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
}));
