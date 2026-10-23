// cspell:ignore maxage
import {type CacheControl, parse} from '@tusbar/cache-control';

/**
 * Parses the `Cache-Control` HTTP header into an object with a property per
 * directive: `maxAge`, `sharedMaxAge` (`s-maxage`), `staleWhileRevalidate` and
 * `staleIfError` are numbers of seconds; `public`, `private`, `noCache`,
 * `noStore`, `mustRevalidate`, `immutable`, etc. are booleans; `noCacheFields`
 * and `privateFields` list the header names of `no-cache="..."` and
 * `private="..."`.
 * Unknown directives are ignored.
 * Missing ones are `false` for flags (like `noStore`) and `null` for the ones
 * with a value (like `maxAge`); without a header, all of them are `null`.
 *
 * The result can be changed and turned back into a header with
 * `formatCacheControl` (or its own `format()` method).
 * @param header - The header value (`null` and `undefined` are accepted, as returned by
 * `Headers#get`).
 * @returns The directives.
 * @example
 * const directives = parseCacheControl('public, max-age=600, stale-while-revalidate=30');
 * directives.maxAge;
 * // 600
 * directives.public;
 * // true
 * directives.noStore;
 * // false
 * @example
 * // Is the response cacheable at all?
 * const {noStore, private: isPrivate} = parseCacheControl(response.headers.get('cache-control'));
 */
export const parseCacheControl = (header: string | null | undefined): CacheControl =>
  parse(header || undefined);
