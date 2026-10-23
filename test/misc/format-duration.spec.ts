import {formatDuration} from '../../src/misc/format-duration.ts';

describe('misc/formatDuration', () => {
  it('formats a duration with short units by default', () => {
    expect(formatDuration(1_337_000_000)).toBe('15d 11h 23m 20s');
    expect(formatDuration(1337)).toBe('1.3s');
    expect(formatDuration(133)).toBe('133ms');
  });

  it('accepts bigints and negative durations', () => {
    expect(formatDuration(3_723_000n)).toBe('1h 2m 3s');
    expect(formatDuration(-3_723_000)).toBe('-1h 2m 3s');
  });

  it('supports the documented options', () => {
    expect(formatDuration(1_335_669_000, {verbose: true})).toBe(
      '15 days 11 hours 1 minute 9 seconds',
    );
    expect(formatDuration(1337, {compact: true})).toBe('1s');
    expect(formatDuration(3_723_000, {colonNotation: true})).toBe('1:02:03');
    expect(formatDuration(95_500, {colonNotation: true, secondsDecimalDigits: 0})).toBe('1:35');
    expect(formatDuration(90_061_000, {colonNotation: true, hideYearAndDays: true})).toBe(
      '25:01:01',
    );
    expect(formatDuration(3_723_000, {colonNotation: true, unitCount: 1})).toBe('1:02:03');
  });

  it('hides the seconds unless the duration is under a minute', () => {
    expect(formatDuration(90_000, {hideSeconds: true})).toBe('1m');
    expect(formatDuration(45_000, {hideSeconds: true})).toBe('45s');
    expect(formatDuration(60_000, {colonNotation: true, hideSeconds: true})).toBe('0:01');
    expect(formatDuration(3_723_000, {colonNotation: true, hideSeconds: true})).toBe('1:02');
  });
});
