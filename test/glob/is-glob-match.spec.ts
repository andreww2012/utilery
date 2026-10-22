import {isGlobMatch} from '../../src/glob/is-glob-match.ts';

describe('glob/isGlobMatch', () => {
  it('matches one or several patterns', () => {
    expect(isGlobMatch('src/utils/index.ts', 'src/**/*.ts')).toBe(true);
    expect(isGlobMatch('README.md', ['*.ts', '*.md'])).toBe(true);
    expect(isGlobMatch('README.md', ['*.ts'])).toBe(false);
  });

  it('supports negated patterns', () => {
    expect(isGlobMatch('a.js', '!*.ts')).toBe(true);
    expect(isGlobMatch('a.ts', '!*.ts')).toBe(false);
  });

  it('supports the options', () => {
    expect(isGlobMatch('.env', '*')).toBe(false);
    expect(isGlobMatch('.env', '*', {dot: true})).toBe(true);
    expect(isGlobMatch('a/b/c.js', '*.js')).toBe(false);
    expect(isGlobMatch('a/b/c.js', '*.js', {matchBasename: true})).toBe(true);
  });
});
