// cspell:ignore ascript avascript
import {sanitizeUrl as sanitizeUrlBase} from '@braintree/sanitize-url';

/** Makes a URL safe to put into an `href` or a `src` attribute */
export const sanitizeUrl: {
  /**
   * Makes a URL from untrusted input safe to put in a link (`href`) or an image
   * (`src`): a URL that could run code, with a `javascript:`, `data:` or
   * `vbscript:` scheme, is replaced with `'about:blank'`.
   *
   * Common tricks to hide such a scheme are handled: HTML entities
   * (`&#106;avascript:`), percent-encoding, control characters and whitespace
   * inside the scheme.
   * Relative URLs and other schemes (`https:`, `mailto:`, custom app schemes) are
   * kept; invalid `http(s):` URLs and empty input give `'about:blank'` too.
   * @param url - The URL to sanitize.
   * @returns The URL, or `'about:blank'` if it is unsafe.
   * @example
   * sanitizeUrl('https://example.com/page');
   * // 'https://example.com/page'
   * sanitizeUrl('/relative/path');
   * // '/relative/path'
   * @example
   * sanitizeUrl('javascript:alert(document.domain)');
   * // 'about:blank'
   * sanitizeUrl('jav&#x09;ascript:alert(1)');
   * // 'about:blank'
   */
  (url?: string): string;
} = sanitizeUrlBase;
