import {unquote} from '../../src/string/unquote.ts';

describe('string/unquote', () => {
  it('removes matching quotes', () => {
    expect(unquote('"hello world"')).toBe('hello world');
    expect(unquote("'single'")).toBe('single');
    expect(unquote('`back`')).toBe('back');
    expect(unquote('""')).toBe('');
  });

  it('removes only one pair', () => {
    expect(unquote('""a""')).toBe('"a"');
  });

  it('keeps strings without matching quotes', () => {
    expect(unquote('"mismatched\'')).toBe('"mismatched\'');
    expect(unquote('"')).toBe('"');
    expect(unquote('plain')).toBe('plain');
    expect(unquote('')).toBe('');
  });

  it('accepts custom quotes', () => {
    expect(unquote("'kept'", ['"'])).toBe("'kept'");
    expect(unquote('|piped|', ['|'])).toBe('piped');
  });

  it('removes quotes outside the Basic Multilingual Plane whole', () => {
    expect(unquote('🔥a🔥', ['🔥'])).toBe('a');
    expect(unquote('🔥', ['🔥'])).toBe('🔥');
  });
});
