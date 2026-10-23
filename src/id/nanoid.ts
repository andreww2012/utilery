// cspell:ignore Uakgb
import {nanoid as nanoidSecure} from 'nanoid';
import {nanoid as nanoidNonSecure} from 'nanoid/non-secure';

/**
 * Generates a random, URL-safe unique ID (a "Nano ID") built from the 64-symbol
 * alphabet `A-Za-z0-9_-` (see `NANOID_URL_ALPHABET`).
 * With the default `size` of 21 the collision probability is comparable to a
 * UUID v4, while the ID is shorter and URL-safe.
 *
 * By default the ID is generated from a cryptographically secure random source.
 * Pass `{insecure: true}` for a faster `Math.random`-based source with a higher
 * (and predictable) collision probability, suitable when the IDs are not
 * security-sensitive.
 * @param size - The length of the ID.
 * Defaults to `21`.
 * @param options - Optional settings.
 * @param options.insecure - When `true`, use a fast but predictable `Math.random` source instead of
 * a cryptographically secure one.
 * Defaults to `false`.
 * @returns A random string of length `size`.
 * @example
 * // Default: 21-symbol, cryptographically secure ID
 * nanoid();
 * // e.g. 'V1StGXR8_Z5jdHi6B-myT'
 * @example
 * // Custom length
 * nanoid(10);
 * // e.g. 'IRFa-VaY2b'
 * @example
 * // Faster but predictable (e.g. for non-sensitive keys)
 * nanoid(10, {insecure: true});
 * // e.g. 'Uakgb_J5m9'
 */
export const nanoid = (size = 21, options?: {insecure?: boolean}): string =>
  options?.insecure ? nanoidNonSecure(size) : nanoidSecure(size);
