import type {DigitCharacter as DigitCharacterBase} from 'type-fest';

/**
 * A digit as a string: `'0'` to `'9'`.
 * @example
 * const valid: DigitCharacter = '0';
 * // @ts-expect-error: a number, not a string
 * const invalid: DigitCharacter = 0;
 */
export type DigitCharacter = DigitCharacterBase;
