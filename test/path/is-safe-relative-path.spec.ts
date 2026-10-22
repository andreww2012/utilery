import {isSafeRelativePath} from '../../src/path/is-safe-relative-path.ts';

describe('path/isSafeRelativePath', () => {
  it('accepts relative paths that stay inside', () => {
    expect(isSafeRelativePath('docs/readme.md')).toBe(true);
    expect(isSafeRelativePath('docs/../readme.md')).toBe(true);
    expect(isSafeRelativePath('./a//b/')).toBe(true);
    expect(isSafeRelativePath('.')).toBe(true);
    expect(isSafeRelativePath('..hidden/file')).toBe(true);
    expect(isSafeRelativePath(String.raw`a\b`)).toBe(true);
  });

  it('rejects paths that leave the base directory', () => {
    expect(isSafeRelativePath('..')).toBe(false);
    expect(isSafeRelativePath('../etc/passwd')).toBe(false);
    expect(isSafeRelativePath('a/../../b')).toBe(false);
    expect(isSafeRelativePath(String.raw`a\..\..\b`)).toBe(false);
  });

  it('rejects absolute, drive and UNC paths', () => {
    expect(isSafeRelativePath('/etc/passwd')).toBe(false);
    expect(isSafeRelativePath(String.raw`C:\Windows`)).toBe(false);
    expect(isSafeRelativePath('c:file')).toBe(false);
    expect(isSafeRelativePath(String.raw`\\server\share`)).toBe(false);
  });

  it('rejects empty paths and null characters', () => {
    expect(isSafeRelativePath('')).toBe(false);
    expect(isSafeRelativePath('a\0b')).toBe(false);
  });
});
