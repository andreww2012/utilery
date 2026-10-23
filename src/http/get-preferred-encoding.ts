import Negotiator from 'negotiator';

/**
 * Picks the content encoding (compression) to respond with, based on the
 * `Accept-Encoding` header of a request: the one the client prefers most,
 * respecting quality values (`br;q=1.0, gzip;q=0.8`) and refusals (`;q=0`).
 *
 * Pass the encodings the server supports, in its own order of preference for
 * ties.
 * `'identity'` (no encoding) is acceptable unless the client refuses it, so
 * include it to fall back to no compression.
 * @param acceptEncoding - The `Accept-Encoding` header value (a missing header accepts only
 * `identity`).
 * @param available - The encodings the server supports.
 * Without it, the encoding the client prefers is returned as is, which can be `'*'` (any).
 * @returns The encoding to use, or `undefined` if none is acceptable.
 * @example
 * getPreferredEncoding('gzip, deflate, br', ['br', 'gzip']);
 * // 'br'
 * getPreferredEncoding('gzip;q=0.5, br;q=0.1', ['br', 'gzip']);
 * // 'gzip'
 * @example
 * // Fall back to no compression
 * getPreferredEncoding(request.headers['accept-encoding'], ['br', 'gzip', 'identity']);
 */
export const getPreferredEncoding = (
  acceptEncoding: string | null | undefined,
  available?: readonly string[],
): string | undefined => {
  // The types of the package lack the `preferred` option, which breaks ties in the server's order
  const negotiator: {
    encoding: (
      availableEncodings?: readonly string[],
      options?: {preferred?: readonly string[]},
    ) => string | undefined;
  } = new Negotiator({headers: {'accept-encoding': acceptEncoding || undefined}});

  return negotiator.encoding(available, {preferred: available});
};
