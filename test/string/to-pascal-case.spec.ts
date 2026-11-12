import {toPascalCase} from '../../src/string/to-pascal-case.ts';

describe('string/toPascalCase', () => {
  it('basic test', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
    expect(toPascalCase('foo-bar-baz')).toBe('FooBarBaz');
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toPascalCase('café crème')).toBe('CaféCrème');
  });
});
