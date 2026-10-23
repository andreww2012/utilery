import {formatBytes} from '../../src/misc/format-bytes.ts';

describe('misc/formatBytes', () => {
  it('formats with decimal units by default', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(100)).toBe('100 B');
    expect(formatBytes(1337)).toBe('1.34 kB');
    expect(formatBytes(-1_500_000)).toBe('-1.5 MB');
    expect(formatBytes(1337n)).toBe('1.34 kB');
  });

  it('supports the documented options', () => {
    expect(formatBytes(1024, {binary: true})).toBe('1 KiB');
    expect(formatBytes(1337, {bits: true})).toBe('1.34 kbit'); // cspell:disable-line
    expect(formatBytes(42, {signed: true})).toBe('+42 B');
    expect(formatBytes(1337, {locale: 'de'})).toBe('1,34 kB');
    expect(formatBytes(1337, {maximumFractionDigits: 1})).toBe('1.3 kB');
  });
});
