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

  it('cuts the decimals of the seconds instead of rounding them', () => {
    expect(formatDuration(1999)).toBe('1.9s');
    expect(formatDuration(1999, {secondsDecimalDigits: 0})).toBe('1s');
  });

  it('rounds the milliseconds, but never up to a second or down to zero', () => {
    expect(formatDuration(999.6)).toBe('999ms');
    expect(formatDuration(0.2)).toBe('1ms');
  });

  it('keeps the decimals of whole seconds with `keepDecimalsOnWholeSeconds`', () => {
    expect(formatDuration(13_000)).toBe('13s');
    expect(formatDuration(13_000, {keepDecimalsOnWholeSeconds: true})).toBe('13.0s');
  });

  it('shows the given number of units, unless `compact`', () => {
    expect(formatDuration(1_337_000_000, {unitCount: 2})).toBe('15d 11h');
    expect(formatDuration(1_337_000_000, {compact: true, unitCount: 2})).toBe('15d');
  });

  it('shows the milliseconds as a separate unit with `separateMilliseconds`', () => {
    expect(formatDuration(1337, {separateMilliseconds: true})).toBe('1s 337ms');
  });

  it('shows the microseconds and the nanoseconds with `formatSubMilliseconds`', () => {
    expect(formatDuration(0.0012, {formatSubMilliseconds: true})).toBe('1µs 200ns');
    expect(formatDuration(5e-7, {formatSubMilliseconds: true})).toBe('0ms');
  });

  it('writes the duration like a clock with `colonNotation`', () => {
    expect(formatDuration(18_105_000, {colonNotation: true})).toBe('5:01:45');
    expect(formatDuration(1000, {colonNotation: true})).toBe('0:01');
    expect(formatDuration(31_968_000_000, {colonNotation: true})).toBe('1:005:00:00:00');
    expect(formatDuration(3_723_000, {colonNotation: true, verbose: true})).toBe('1:02:03');
  });

  it('shows the years as days or hours with `hideYear` and `hideYearAndDays`', () => {
    const durationMs = 31_813_305_000;

    expect(formatDuration(durationMs)).toBe('1y 3d 5h 1m 45s');
    expect(formatDuration(durationMs, {hideYear: true})).toBe('368d 5h 1m 45s');
    expect(formatDuration(durationMs, {hideYearAndDays: true})).toBe('8837h 1m 45s');
    expect(formatDuration(durationMs, {hideSeconds: true})).toBe('1y 3d 5h 1m');
  });

  it('always shows the hours with `colonNotation` and `hideSeconds`', () => {
    expect(formatDuration(45_000, {colonNotation: true, hideSeconds: true})).toBe('0:00:45');
  });

  it('shows a duration under a second as decimal seconds with `subSecondsAsDecimals`', () => {
    expect(formatDuration(900, {subSecondsAsDecimals: true})).toBe('0.9s');
    expect(formatDuration(999, {subSecondsAsDecimals: true})).toBe('0.9s');
    expect(formatDuration(50, {subSecondsAsDecimals: true})).toBe('50ms');
    expect(formatDuration(900, {subSecondsAsDecimals: true, compact: true})).toBe('900ms');
  });
});
