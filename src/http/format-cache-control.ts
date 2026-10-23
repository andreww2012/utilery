import {type CacheControlValue, format} from '@tusbar/cache-control';

/**
 * `Cache-Control` directives, as accepted by `formatCacheControl` and returned by
 * `parseCacheControl`
 */
export type CacheControlDirectives = CacheControlValue;

/**
 * Builds a `Cache-Control` HTTP header from an object of directives, the
 * reverse of `parseCacheControl`.
 * Numbers are seconds; `false`, `null` and missing directives are left out.
 * @param directives - The directives, like `{public: true, maxAge: 600}`.
 * @returns The header value.
 * @example
 * formatCacheControl({public: true, maxAge: 600, staleWhileRevalidate: 30});
 * // 'max-age=600, public, stale-while-revalidate=30'
 * formatCacheControl({noStore: true});
 * // 'no-store'
 */
export const formatCacheControl: (directives: CacheControlDirectives) => string = format;
