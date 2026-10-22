import {isGlobPattern} from '../../src/glob/is-glob-pattern.ts';

describe('glob/isGlobPattern', () => {
  it('detects glob syntax', () => {
    expect(isGlobPattern('src/**/*.ts')).toBe(true);
    expect(isGlobPattern('src/{a,b}.ts')).toBe(true);
    expect(isGlobPattern('file?.txt')).toBe(true);
    expect(isGlobPattern('[abc].txt')).toBe(true);
  });

  it('rejects plain paths and escaped characters', () => {
    expect(isGlobPattern('src/index.ts')).toBe(false);
    expect(isGlobPattern(String.raw`\*.txt`)).toBe(false);
  });
});
