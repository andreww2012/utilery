import {parseBoolean} from '../../src/misc/parse-boolean.ts';

describe('misc/parseBoolean', () => {
  it('parses yes-like and no-like values', () => {
    ['y', 'yes', 't', 'true', '1', 'on', ' YES ', true, 1].forEach((value) => {
      expect(parseBoolean(value)).toBe(true);
    });
    ['n', 'no', 'f', 'false', '0', 'off', 'OFF', false, 0].forEach((value) => {
      expect(parseBoolean(value)).toBe(false);
    });
  });

  it('gives the default for other values', () => {
    expect(parseBoolean('maybe')).toBeUndefined();
    expect(parseBoolean(undefined, {default: false})).toBe(false);
    expect(parseBoolean('', {default: true})).toBe(true);
  });

  it('accepts typos with `lenient`', () => {
    expect(parseBoolean('mo', {lenient: true})).toBe(false);
    expect(parseBoolean('ues', {lenient: true})).toBe(true);
  });
});
