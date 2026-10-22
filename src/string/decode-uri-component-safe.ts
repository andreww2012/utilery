// cspell:ignore ståle
import decodeUriComponent from 'decode-uri-component';

/**
 * Decodes a percent-encoded URI component, like `decodeURIComponent`, but
 * never throws: a malformed sequence, like a lone `%` or broken UTF-8 bytes,
 * is kept as is while the rest is still decoded. Useful for paths and query
 * values that come from users.
 * @param encoded - The percent-encoded string.
 * @returns The decoded string.
 * @example
 * decodeUriComponentSafe('st%C3%A5le');
 * // 'ståle'
 * @example
 * // `decodeURIComponent` would throw on these
 * decodeUriComponentSafe('100%');
 * // '100%'
 * decodeUriComponentSafe('%E0%A4%A ok %C3%A5');
 * // '%E0%A4%A ok å'
 */
export const decodeUriComponentSafe: (encoded: string) => string = decodeUriComponent;
