import { styled } from '@mui/material/styles';

export const BarTrack = styled('div')(({ theme }) => ({
  position: 'relative',
  height: 8,
  borderRadius: 999,
  overflow: 'hidden',
  backgroundColor: theme.palette.divider,
}));

export const BarFill = styled('div', {
  shouldForwardProp: (prop) => prop !== 'value',
})<{ value: number }>(({ theme, value }) => {
  let color = theme.palette.success.main;
  if (value < 0.5) color = theme.palette.error.main;
  else if (value < 0.8) color = theme.palette.warning.main;

  return {
    height: '100%',
    width: `${Math.round(value * 100)}%`,
    borderRadius: 999,
    backgroundColor: color,
    transition: 'width 500ms ease-out',
  };
});
