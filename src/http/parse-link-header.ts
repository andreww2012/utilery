// cspell:ignore chstes nächstes
import LinkHeader from 'http-link-header';

/** A parameter given in the extended `name*` form (RFC 8187), like `title*=UTF-8'de'n%c3%a4chstes` */
export interface LinkHeaderExtendedValue {
  /** The language of the value, like `'de'`, if given */
  language: string | null;
  /** The character encoding of the value, if given */
  encoding: string | null;
  /** The decoded value */
  value: string;
}

/** A link from a `Link` HTTP header */
export interface LinkHeaderEntry {
  /** The link target, as written in the header (may be relative) */
  uri: string;
  /** The relation of the link, like `'next'`; missing when the header gives none */
  rel?: string;
  /** Other parameters of the link, like `title` or `type`; `name*` parameters are decoded */
  [parameter: string]: string | LinkHeaderExtendedValue | undefined;
}

/**
 * Parses the `Link` HTTP header (RFC 8288), used for pagination by APIs like
 * GitHub's, into a list of links.
 * A link with several relations (`rel="next last"`) is listed once per
 * relation.
 * Parameters are unquoted, and commas inside quoted values are handled.
 * @param header - The header value (`null` and `undefined` are accepted, as returned by
 * `Headers#get`).
 * @returns The links, or an empty array if the header is missing or invalid.
 * @example
 * parseLinkHeader('<https://api.example.com/items?page=2>; rel="next", <https://api.example.com/items?page=5>; rel="last"');
 * // [
 * //   {uri: 'https://api.example.com/items?page=2', rel: 'next'},
 * //   {uri: 'https://api.example.com/items?page=5', rel: 'last'},
 * // ]
 * @example
 * // Follow the pagination
 * const next = parseLinkHeader(response.headers.get('link')).find((link) => link.rel === 'next');
 * if (next) {
 *   await fetch(new URL(next.uri, response.url));
 * }
 */
export const parseLinkHeader = (header: string | null | undefined): LinkHeaderEntry[] => {
  if (!header) {
    return [];
  }

  try {
    return LinkHeader.parse(header).refs;
  } catch {
    return [];
  }
};
