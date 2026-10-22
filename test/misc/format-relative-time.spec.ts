// cspell:ignore Monaten
import {formatRelativeTime} from '../../src/misc/format-relative-time.ts';

const NOW = new Date('2024-06-15T12:00:00Z');
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const format = (offset: number, options = {}) =>
  formatRelativeTime(NOW.getTime() + offset, {now: NOW, locale: 'en', ...options});

describe('misc/formatRelativeTime', () => {
  it('uses the largest fitting unit', () => {
    expect(format(-30 * SECOND)).toBe('30 seconds ago');
    expect(format(-5 * MINUTE)).toBe('5 minutes ago');
    expect(format(2 * HOUR)).toBe('in 2 hours');
    expect(format(-3 * DAY)).toBe('3 days ago');
    expect(format(-14 * DAY)).toBe('2 weeks ago');
    expect(format(-60 * DAY)).toBe('2 months ago');
    expect(format(3 * 365 * DAY)).toBe('in 3 years');
  });

  it('uses words when available', () => {
    expect(format(0)).toBe('now');
    expect(format(-DAY)).toBe('yesterday');
    expect(format(DAY, {numeric: 'always'})).toBe('in 1 day');
  });

  it('rounds the past and the future the same way', () => {
    expect(format(-90 * SECOND)).toBe('2 minutes ago');
    expect(format(90 * SECOND)).toBe('in 2 minutes');
  });

  it('supports the locale and the style', () => {
    expect(format(-60 * DAY, {locale: 'de'})).toBe('vor 2 Monaten');
    expect(format(-5 * MINUTE, {style: 'short'})).toBe('5 min. ago');
  });

  it('defaults `now` to the current time', () => {
    expect(formatRelativeTime(Date.now() - 3 * DAY, {locale: 'en'})).toBe('3 days ago');
  });

  it('throws for an invalid date', () => {
    expect(() => formatRelativeTime(new Date('x'))).toThrow(RangeError);
  });
});
