import type { AtsRule } from '@/types/ats';
import { checkBulletsAndVerbs } from './bulletsAndVerbs';
import { checkContact } from './contact';
import { checkDates } from './dates';
import { checkFileSize } from './fileSize';
import { checkFormatting } from './formatting';
import { checkKeywords } from './keywords';
import { checkLength } from './length';
import { checkQuantified } from './quantified';
import { checkSections } from './sections';
import { checkTextExtractable } from './textExtractable';

/** Every rule, in the order it is shown in the breakdown. */
export const ATS_RULES: AtsRule[] = [
  checkTextExtractable,
  checkSections,
  checkContact,
  checkKeywords,
  checkBulletsAndVerbs,
  checkQuantified,
  checkDates,
  checkLength,
  checkFormatting,
  checkFileSize,
];

export { RULE_WEIGHTS } from './weights';
