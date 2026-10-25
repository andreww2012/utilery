import {objectEntriesUnsafe} from '../../src/object/object-entries-unsafe.ts';

describe('object/objectEntriesUnsafe', () => {
  it('basic test', () => {
    expect(objectEntriesUnsafe({a: 1, b: 2})).toStrictEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('includes optional properties set to `undefined`', () => {
    const user: {name: string; age?: number | undefined} = {name: 'Ada', age: undefined};

    expect(objectEntriesUnsafe(user)).toStrictEqual([
      ['name', 'Ada'],
      ['age', undefined],
    ]);
  });

  it('gives number keys as strings and skips symbol keys', () => {
    expect(objectEntriesUnsafe({1: 'one', [Symbol('key')]: 2})).toStrictEqual([['1', 'one']]);
  });

  it('gives the index strings and other own keys of arrays', () => {
    expect(objectEntriesUnsafe(Object.assign(['a', 'b'], {extra: 1}))).toStrictEqual([
      ['0', 'a'],
      ['1', 'b'],
      ['extra', 1],
    ]);
  });

  it('gives only the properties set on maps and sets', () => {
    expect(objectEntriesUnsafe(Object.assign(new Map([['a', 1]]), {extra: true}))).toStrictEqual([
      ['extra', true],
    ]);
    expect(objectEntriesUnsafe(new Set(['a']))).toStrictEqual([]);
  });
});
