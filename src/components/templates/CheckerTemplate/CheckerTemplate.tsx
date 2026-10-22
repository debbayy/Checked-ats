import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Brand, Columns, Header, Main, PageShell, Sidebar } from './CheckerTemplate.styles';

export interface CheckerTemplateProps {
  sidebar: ReactNode;
  children: ReactNode;
}

/** Page layout: header on top, upload on the left, results on the right (stacked on mobile). */
export function CheckerTemplate({ sidebar, children }: CheckerTemplateProps) {
  return (
    <PageShell>
      <Header>
        <Brand>
          <FactCheckOutlinedIcon fontSize="small" />
          ATS CV Checker
        </Brand>
        <Typography variant="h1">Seberapa terbaca CV kamu oleh ATS?</Typography>
        <Typography variant="body1" color="text.secondary">
          Upload CV, lihat skornya, dan perbaiki bagian yang bikin CV kamu tersaring sebelum dibaca
          rekruter.
        </Typography>
      </Header>
      <Columns>
        <Sidebar>{sidebar}</Sidebar>
        <Main>{children}</Main>
      </Columns>
    </PageShell>
  );
}
