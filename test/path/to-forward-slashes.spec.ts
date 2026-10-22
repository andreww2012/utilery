import {toForwardSlashes} from '../../src/path/to-forward-slashes.ts';

describe('path/toForwardSlashes', () => {
  it('basic test', () => {
    expect(toForwardSlashes(String.raw`a\b\c`)).toBe('a/b/c');
  });
});
