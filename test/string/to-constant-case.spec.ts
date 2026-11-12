import {toConstantCase} from '../../src/string/to-constant-case.ts';

describe('string/toConstantCase', () => {
  it('basic test', () => {
    expect(toConstantCase('hello world')).toBe('HELLO_WORLD');
    expect(toConstantCase('fooBarBaz')).toBe('FOO_BAR_BAZ');
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toConstantCase('café crème')).toBe('CAFÉ_CRÈME');
  });
});
