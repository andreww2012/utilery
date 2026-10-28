import {formatRelativeTime} from '../../src/misc/format-relative-time.ts';

const now = new Date('2024-06-15T12:00:00Z');
const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const format = (offset: number, options = {}) =>
  formatRelativeTime(now.getTime() + offset, {now, locale: 'en', ...options});

describe('misc/formatRelativeTime', () => {
  it('uses the largest fitting unit', () => {
    expect(format(-30 * SECOND_MS)).toBe('30 seconds ago');
    expect(format(-5 * MINUTE_MS)).toBe('5 minutes ago');
    expect(format(2 * HOUR_MS)).toBe('in 2 hours');
    expect(format(-3 * DAY_MS)).toBe('3 days ago');
    expect(format(-14 * DAY_MS)).toBe('2 weeks ago');
    expect(format(-60 * DAY_MS)).toBe('2 months ago');
    expect(format(3 * 365 * DAY_MS)).toBe('in 3 years');
  });

  it('uses words when available', () => {
    expect(format(0)).toBe('now');
    expect(format(-DAY_MS)).toBe('yesterday');
    expect(format(DAY_MS, {numeric: 'always'})).toBe('in 1 day');
  });

  it('rounds the past and the future the same way', () => {
    expect(format(-90 * SECOND_MS)).toBe('2 minutes ago');
    expect(format(90 * SECOND_MS)).toBe('in 2 minutes');
  });

  it('supports the locale and the style', () => {
    expect(format(-60 * DAY_MS, {locale: 'de'})).toBe('vor 2 Monaten'); // cspell:disable-line
    expect(format(-5 * MINUTE_MS, {style: 'short'})).toBe('5 min. ago');
  });

  it('defaults `now` to the current time', () => {
    expect(formatRelativeTime(Date.now() - 3 * DAY_MS, {locale: 'en'})).toBe('3 days ago');
  });

  it('throws for an invalid date', () => {
    expect(() => formatRelativeTime(new Date('x'))).toThrow(RangeError);
  });
});
