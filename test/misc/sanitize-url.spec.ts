// cspell:ignore ascript
/* eslint-disable no-script-url -- unsafe URLs are what is being tested */
import {sanitizeUrl} from '../../src/misc/sanitize-url.ts';

describe('misc/sanitizeUrl', () => {
  it('keeps safe URLs', () => {
    expect(sanitizeUrl('https://example.com/page')).toBe('https://example.com/page');
    expect(sanitizeUrl('/relative/path')).toBe('/relative/path');
    expect(sanitizeUrl('#anchor')).toBe('#anchor');
    expect(sanitizeUrl('mailto:a@example.com')).toBe('mailto:a@example.com');
  });

  it('replaces dangerous URLs', () => {
    [
      'javascript:alert(1)',
      'JAVASCRIPT:alert(1)',
      ' javascript:alert(1)',
      'jav&#x09;ascript:alert(1)',
      '&#106;avascript:alert(1)', // cspell:disable-line
      'java%0ascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox(1)', // cspell:disable-line
      '',
    ].forEach((url) => {
      expect(sanitizeUrl(url)).toBe('about:blank');
    });
  });
});
