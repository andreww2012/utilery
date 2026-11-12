import {toSnakeCase} from '../../src/string/to-snake-case.ts';

describe('string/toSnakeCase', () => {
  it('basic test', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world');
    expect(toSnakeCase('fooBarBaz')).toBe('foo_bar_baz');
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toSnakeCase('café crème')).toBe('café_crème');
  });
});
