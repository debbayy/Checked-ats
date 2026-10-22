import { ThemeProvider } from '@mui/material/styles';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { theme } from '@/theme';

/** Render a component inside the app theme, like it is in the real app. */
export function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
}
