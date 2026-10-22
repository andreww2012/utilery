import {globToRegex} from '../../src/glob/glob-to-regex.ts';

describe('glob/globToRegex', () => {
  it('converts globs into regular expressions matching whole paths', () => {
    const regex = globToRegex('src/**/*.{js,ts}');

    expect(regex.test('src/utils/index.ts')).toBe(true);
    expect(regex.test('src/index.js')).toBe(true);
    expect(regex.test('test/index.ts')).toBe(false);
    expect(regex.test('src/index.tsx')).toBe(false);
  });

  it('supports classes, question marks and extended globs', () => {
    expect(globToRegex('file-[0-9]?.txt').test('file-1a.txt')).toBe(true);
    expect(globToRegex('*.+(js|ts)').test('a.ts')).toBe(true);
  });

  it('supports the options', () => {
    expect(globToRegex('*.md', {caseInsensitive: true}).test('README.MD')).toBe(true);
    expect(globToRegex('*').test('.env')).toBe(false);
    expect(globToRegex('*', {dot: true}).test('.env')).toBe(true);
    expect(globToRegex('src/*.ts').test(String.raw`src\a.ts`)).toBe(false);
    expect(globToRegex('src/*.ts', {windows: true}).test(String.raw`src\a.ts`)).toBe(true);
  });
});
