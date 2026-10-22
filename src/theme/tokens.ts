/**
 * Design tokens. Every color and font in the app comes from here.
 * Layout concept: a calm "inspection desk" — upload on the left, the report on the right.
 */
export const colors = {
  canvas: '#F2F4F1',
  surface: '#FFFFFF',
  surfaceSunken: '#E8ECE7',
  ink: '#15201B',
  inkMuted: '#58645E',
  line: '#D5DBD4',
  primary: '#1D5C4C',
  primarySoft: '#DCEAE4',
  highlight: '#E3B23C',
  good: '#2B7A4B',
  fair: '#B7791F',
  poor: '#B3261E',
  info: '#2F5D8A',
} as const;

export const fonts = {
  display: '"Bricolage Grotesque Variable", "Segoe UI", system-ui, sans-serif',
  body: '"Figtree Variable", "Segoe UI", system-ui, sans-serif',
  mono: '"JetBrains Mono Variable", ui-monospace, "SFMono-Regular", Menlo, monospace',
} as const;

export const radii = { sm: 6, md: 10, lg: 16 } as const;
