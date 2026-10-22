import {substringAfterLast} from '../../src/string/substring-after-last.ts';
import {substringAfter} from '../../src/string/substring-after.ts';
import {substringBeforeLast} from '../../src/string/substring-before-last.ts';
import {substringBefore} from '../../src/string/substring-before.ts';

describe('string/substringBefore, substringAfter, substringBeforeLast, substringAfterLast', () => {
  it('splits at the first or the last delimiter', () => {
    expect(substringBefore('index.test.ts', '.')).toBe('index');
    expect(substringAfter('index.test.ts', '.')).toBe('test.ts');
    expect(substringBeforeLast('index.test.ts', '.')).toBe('index.test');
    expect(substringAfterLast('index.test.ts', '.')).toBe('ts');
  });

  it('supports delimiters longer than one character', () => {
    expect(substringBefore('https://example.com', '://')).toBe('https');
    expect(substringAfter('https://example.com', '://')).toBe('example.com');
    expect(substringAfterLast('a::b::c', '::')).toBe('c');
    expect(substringBeforeLast('a::b::c', '::')).toBe('a::b');
  });

  it('returns the whole string or the fallback when the delimiter is missing', () => {
    expect(substringBefore('README', '.')).toBe('README');
    expect(substringAfter('README', '.')).toBe('README');
    expect(substringBeforeLast('README', '.', '')).toBe('');
    expect(substringAfterLast('README', '.', '')).toBe('');
  });
});
