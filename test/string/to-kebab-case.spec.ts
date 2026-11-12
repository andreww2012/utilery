import {toKebabCase} from '../../src/string/to-kebab-case.ts';

describe('string/toKebabCase', () => {
  it('basic test', () => {
    expect(toKebabCase('hello world')).toBe('hello-world');
    expect(toKebabCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toKebabCase('café crème')).toBe('café-crème');
  });
});
