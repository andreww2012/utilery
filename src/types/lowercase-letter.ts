import type {LowercaseLetter as LowercaseLetterBase} from 'type-fest';

/**
 * A lowercase basic Latin letter: `'a'` to `'z'`.
 * @example
 * const valid: LowercaseLetter = 'a';
 * // @ts-expect-error: uppercase
 * const invalid: LowercaseLetter = 'A';
 */
export type LowercaseLetter = LowercaseLetterBase;
