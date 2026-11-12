import {toUpperCase} from '../../src/string/to-upper-case.ts';

describe('string/toUpperCase', () => {
  it('basic test', () => {
    expect(toUpperCase('hello world')).toBe('HELLO WORLD');
    expect(toUpperCase('fooBarBaz')).toBe('FOO BAR BAZ');
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toUpperCase('caféCrème')).toBe('CAFÉ CRÈME');
  });
});
