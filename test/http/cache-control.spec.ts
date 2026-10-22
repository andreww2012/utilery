// cspell:ignore maxage
import {formatCacheControl} from '../../src/http/format-cache-control.ts';
import {parseCacheControl} from '../../src/http/parse-cache-control.ts';

describe('http/parseCacheControl, http/formatCacheControl', () => {
  it('parses directives', () => {
    const directives = parseCacheControl(
      'public, max-age=600, s-maxage=60, stale-while-revalidate=30, no-cache="Set-Cookie"',
    );

    expect(directives).toMatchObject({
      public: true,
      maxAge: 600,
      sharedMaxAge: 60,
      staleWhileRevalidate: 30,
      noCache: true,
      noCacheFields: ['Set-Cookie'],
      noStore: false,
    });
  });

  it('gives `null` for every directive of a missing header', () => {
    expect(parseCacheControl(null).maxAge).toBeNull();
    expect(parseCacheControl(undefined).noStore).toBeNull();
  });

  it('formats directives', () => {
    expect(formatCacheControl({public: true, maxAge: 600, staleWhileRevalidate: 30})).toBe(
      'max-age=600, public, stale-while-revalidate=30',
    );
    expect(formatCacheControl({noStore: true, maxAge: null, public: false})).toBe('no-store');
  });

  it('round-trips', () => {
    const header = 'max-age=60, must-revalidate, private';

    expect(formatCacheControl(parseCacheControl(header))).toBe(header);
  });
});
