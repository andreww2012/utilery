import {createUniqueSlugify} from '../../src/string/create-unique-slugify.ts';

describe('string/createUniqueSlugify', () => {
  it('adds a counter to repeated slugs', () => {
    const slugify = createUniqueSlugify();

    expect(['Usage', 'Usage', 'Usage', 'API'].map((text) => slugify(text))).toStrictEqual([
      'usage',
      'usage-2',
      'usage-3',
      'api',
    ]);
  });

  it('never returns the same slug twice', () => {
    const slugify = createUniqueSlugify();

    expect(['Usage', 'Usage', 'Usage 2'].map((text) => slugify(text))).toStrictEqual([
      'usage',
      'usage-2',
      'usage-2-2',
    ]);
    expect(['foo-2', 'foo', 'foo', 'Foo'].map((text) => createUniqueSlugify()(text))).toStrictEqual(
      ['foo-2', 'foo', 'foo', 'foo'],
    );

    const other = createUniqueSlugify();

    expect(['foo-2', 'foo', 'foo', 'Foo'].map((text) => other(text))).toStrictEqual([
      'foo-2',
      'foo',
      'foo-3',
      'foo-4',
    ]);
  });

  it('uses the separator for the counter and passes the options', () => {
    const slugify = createUniqueSlugify();

    expect(slugify('A B', {separator: '_'})).toBe('a_b');
    expect(slugify('A B', {separator: '_'})).toBe('a_b_2');
  });

  it('keeps empty slugs empty', () => {
    const slugify = createUniqueSlugify();

    expect(slugify('!!!')).toBe('');
    expect(slugify('!!!')).toBe('');
  });

  it('starts over after `reset`', () => {
    const slugify = createUniqueSlugify();
    slugify('foo');
    slugify('foo');
    slugify.reset();

    expect(slugify('foo')).toBe('foo');
  });
});
