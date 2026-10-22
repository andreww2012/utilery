import {isColorSupported} from '../../src/server/is-color-supported.ts';

const terminal = {isTTY: true, hasColors: () => true};

describe('server/isColorSupported', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('follows `FORCE_COLOR` first', () => {
    vi.stubEnv('FORCE_COLOR', '1');

    expect(isColorSupported({isTTY: false})).toBe(true);

    vi.stubEnv('FORCE_COLOR', '');

    expect(isColorSupported({})).toBe(true);

    vi.stubEnv('FORCE_COLOR', '0');

    expect(isColorSupported(terminal)).toBe(false);

    vi.stubEnv('FORCE_COLOR', 'false');

    expect(isColorSupported(terminal)).toBe(false);
  });

  it('needs a terminal with colors otherwise', () => {
    vi.stubEnv('FORCE_COLOR', undefined);

    expect(isColorSupported(terminal)).toBe(true);
    expect(isColorSupported({isTTY: true, hasColors: () => false})).toBe(false);
    expect(isColorSupported({isTTY: false, hasColors: () => true})).toBe(false);
    expect(isColorSupported({})).toBe(false);
  });
});
