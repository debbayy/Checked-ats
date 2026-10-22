import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Panel } from '@/components/atoms';
import { TextBlock } from './ExtractedTextPreview.styles';

export interface ExtractedTextPreviewProps {
  text: string;
}

/** Shows the raw text an ATS would get, so people can spot what got lost. */
export function ExtractedTextPreview({ text }: ExtractedTextPreviewProps) {
  return (
    <Panel aria-label="Teks yang terbaca ATS">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
          aria-controls="extracted-text"
          id="extracted-text-header"
        >
          <div>
            <Typography variant="h2" component="h2">
              Teks yang terbaca ATS
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Kalau ada bagian CV yang hilang atau berantakan di sini, ATS juga melihatnya begitu.
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails id="extracted-text">
          <TextBlock>{text || '(Tidak ada teks yang terbaca)'}</TextBlock>
        </AccordionDetails>
      </Accordion>
    </Panel>
  );
}
