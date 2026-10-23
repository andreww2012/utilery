import type {UppercaseLetter as UppercaseLetterBase} from 'type-fest';

/**
 * An uppercase basic Latin letter: `'A'` to `'Z'`.
 * @example
 * const valid: UppercaseLetter = 'A';
 * // @ts-expect-error: lowercase
 * const invalid: UppercaseLetter = 'a';
 */
export type UppercaseLetter = UppercaseLetterBase;
