import {dedent} from '../../src/string/dedent.ts';

describe('string/dedent', () => {
  it('basic test', () => {
    const name = 'world';

    expect(dedent`
      hello ${name}
      goodbye
    `).toBe('hello world\ngoodbye');
  });

  it('ignores the lines without indentation when finding the common indentation', () => {
    expect(dedent('a\n  b\n    c')).toBe('a\nb\n  c');
    expect(dedent`first
      second
        third`).toBe('first\nsecond\n  third');
  });
});
