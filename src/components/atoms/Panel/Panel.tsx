import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { PanelRoot } from './Panel.styles';

export interface PanelProps {
  title?: string;
  /** Short line under the title. */
  subtitle?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/** Bordered surface that groups one part of the page. */
export function Panel({ title, subtitle, children, ...rest }: PanelProps) {
  return (
    <PanelRoot aria-label={rest['aria-label'] ?? title}>
      {(title || subtitle) && (
        <div>
          {title && (
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {subtitle}
            </Typography>
          )}
        </div>
      )}
      {children}
    </PanelRoot>
  );
}
