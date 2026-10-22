import { styled } from '@mui/material/styles';
import { radii } from '@/theme';

export const FileRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  minWidth: 0,
  padding: theme.spacing(1.25, 1.5),
  borderRadius: radii.md,
  backgroundColor: theme.palette.background.default,
}));

export const FileName = styled('span')({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontWeight: 600,
});

export const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));
