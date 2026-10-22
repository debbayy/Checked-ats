import type { TextItem } from 'pdfjs-dist/types/src/display/api';

export interface ParsedPdf {
  text: string;
  pageCount: number;
}

/** Items closer than this (in PDF units) vertically belong to the same line. */
const LINE_TOLERANCE = 3;
/** A horizontal gap wider than this is rendered as a wide space (hint for columns). */
const COLUMN_GAP = 24;

interface PositionedText {
  str: string;
  x: number;
  y: number;
  width: number;
}

function isTextItem(item: unknown): item is TextItem {
  return typeof item === 'object' && item !== null && 'str' in item && 'transform' in item;
}

/**
 * Rebuild lines from pdf.js text items, the way an ATS would see them.
 * Wide horizontal gaps are kept as multiple spaces so column layouts stay detectable.
 */
export function buildLines(items: PositionedText[]): string[] {
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: PositionedText[][] = [];

  for (const item of sorted) {
    const current = lines.at(-1);
    const first = current?.[0];
    if (current && first && Math.abs(first.y - item.y) <= LINE_TOLERANCE) {
      current.push(item);
    } else {
      lines.push([item]);
    }
  }

  return lines.map((line) => {
    const ordered = line.sort((a, b) => a.x - b.x);
    return ordered.reduce((text, item, index) => {
      const previous = ordered[index - 1];
      if (!previous) return item.str;
      const gap = item.x - (previous.x + previous.width);
      const separator = gap > COLUMN_GAP ? '    ' : gap > 1 ? ' ' : '';
      return text + separator + item.str;
    }, '');
  });
}

export async function parsePdf(data: ArrayBuffer): Promise<ParsedPdf> {
  // Loaded lazily so pdf.js never runs on the server.
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

  const document = await pdfjs.getDocument({ data }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const items = content.items.filter(isTextItem).map((item) => ({
      str: item.str,
      x: item.transform[4] ?? 0,
      y: item.transform[5] ?? 0,
      width: item.width,
    }));
    pages.push(buildLines(items).join('\n'));
  }

  return { text: pages.join('\n'), pageCount: document.numPages };
}
