import {colors} from '../../src/server/colors.ts';

describe('server/colors', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('styles text when colors are supported', () => {
    vi.stubEnv('FORCE_COLOR', '1');

    expect(colors.red('hi')).toBe('\u{1B}[31mhi\u{1B}[39m');
    expect(colors.bold('hi')).toBe('\u{1B}[1mhi\u{1B}[22m');
    expect(colors.hex('#f00')('hi')).toBe('\u{1B}[38;2;255;0;0mhi\u{1B}[39m');
    expect(colors.bgAnsi256(57)('hi')).toBe('\u{1B}[48;5;57mhi\u{1B}[49m');
  });

  it('returns plain text when colors are not supported', () => {
    vi.stubEnv('FORCE_COLOR', '0');

    expect(colors.red('hi')).toBe('hi');
    expect(colors.green(colors.bold('hi'))).toBe('hi');
    expect(colors.rgb(255, 0, 0)('hi')).toBe('hi');
  });

  it('decides on every call', () => {
    const style = colors.hex('#000');
    vi.stubEnv('FORCE_COLOR', '0');

    expect(style('hi')).toBe('hi');

    vi.stubEnv('FORCE_COLOR', '1');

    expect(style('hi')).not.toBe('hi');
  });

  it('keeps all styles', () => {
    expect(Object.keys(colors)).toHaveLength(47);
    expect(Object.isFrozen(colors)).toBe(true);
  });
});
