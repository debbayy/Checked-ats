import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ChipList, KeywordChip } from './KeywordChipGroup.styles';

export interface KeywordChipGroupProps {
  title: string;
  keywords: string[];
  found: boolean;
}

export function KeywordChipGroup({ title, keywords, found }: KeywordChipGroupProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="overline" color="text.secondary">
        {title} ({keywords.length})
      </Typography>
      {keywords.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Tidak ada.
        </Typography>
      ) : (
        <ChipList aria-label={title}>
          {keywords.map((keyword) => (
            <li key={keyword}>
              <KeywordChip found={found} label={keyword} size="small" />
            </li>
          ))}
        </ChipList>
      )}
    </Stack>
  );
}
