// cspell:ignore cbadfeba fbaef
import {customAlphabet, customRandom, urlAlphabet} from 'nanoid';
import {customAlphabet as customAlphabetNonSecure} from 'nanoid/non-secure';

/**
 * The 64-symbol URL-safe alphabet (`A-Za-z0-9_-`) used by `nanoid` to generate
 * its IDs.
 * Handy as a base when assembling a custom alphabet for {@link nanoidFactory}
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const NANOID_URL_ALPHABET = urlAlphabet;

/**
 * Creates a generator of random IDs built from a custom `alphabet`, in the
 * spirit of `nanoid`.
 * Useful when the default URL-safe alphabet does not fit, e.g. to exclude
 * look-alike characters, restrict IDs to lowercase, or use a domain-specific
 * symbol set.
 *
 * By default IDs are drawn from a cryptographically secure random source.
 * The source can be customized:
 *
 * - Pass `{insecure: true}` for a faster `Math.random`-based source.
 * - Pass `{random}` to supply your own random-bytes generator (e.g.
 *   `randomBytes`); this takes precedence over `insecure`.
 * @param alphabet - The characters the generated IDs may consist of.
 * Must contain 256 symbols or fewer, otherwise the generator is not secure.
 * @param size - The default length of the generated IDs.
 * Defaults to `21`.
 * @param options - Optional settings.
 * @param options.insecure - When `true`, use a fast but predictable `Math.random` source instead of
 * a cryptographically secure one.
 * Ignored when `random` is provided.
 * Defaults to `false`.
 * @param options.random - A custom random-bytes generator.
 * When provided, IDs are drawn from it and `insecure` is ignored.
 * @returns A function generating a random ID; it accepts an optional `size` overriding the default.
 * @example
 * // A generator over a custom alphabet, default length 10
 * const generateId = nanoidFactory('0123456789abcdef', 10);
 * generateId();
 * // e.g. '4f90d13a42'
 * generateId(5); // override the length
 * // e.g. 'f01a2'
 * @example
 * // Faster but predictable
 * const generateKey = nanoidFactory('abcdef', 8, {insecure: true});
 * generateKey();
 * // e.g. 'cbadfeba'
 * @example
 * // With a custom random-bytes source
 * const generate = nanoidFactory('abcdef', 5, {random: randomBytes});
 * generate();
 * // e.g. 'fbaef'
 */
export const nanoidFactory = (
  alphabet: string,
  size = 21,
  options?: {insecure?: boolean; random?: (bytes: number) => Uint8Array},
) => {
  if (options?.random) {
    return customRandom(alphabet, size, options.random);
  }

  return options?.insecure
    ? customAlphabetNonSecure(alphabet, size)
    : customAlphabet(alphabet, size);
};
