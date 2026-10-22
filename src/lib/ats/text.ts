/** Small, dependency-free text helpers used by the rules. */

export function splitLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+$/, ''))
    .filter((line) => line.trim().length > 0);
}

export function countWords(text: string): number {
  const words = text.trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’.+#-]*/gu);
  return words ? words.length : 0;
}

/** Lowercase, strip accents and collapse whitespace. */
export function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Split text into lowercase tokens. Keeps tech-style tokens intact,
 * e.g. "node.js", "c#", "c++", "ci/cd".
 */
export function tokenize(text: string): string[] {
  const tokens = normalize(text).match(/[a-z0-9][a-z0-9.+#/-]*[a-z0-9+#]|[a-z0-9]/g);
  return tokens ?? [];
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Escape a string so it can be used literally inside a RegExp. */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
