import {find} from '../../src/iterable/find.ts';

function* oneToThree() {
  yield 1;
  yield 2;
  yield 3;
}

describe('iterable/find', () => {
  it('returns the first matching element', () => {
    expect(find([1, 2, 3, 4], (value) => value > 2)).toBe(3);
  });

  it('returns undefined when nothing matches', () => {
    expect(find([1, 2, 3], (value) => value > 10)).toBeUndefined();
  });

  it('returns undefined for an empty iterable', () => {
    const empty: number[] = [];

    expect(find(empty, (value) => value > 0)).toBeUndefined();
  });

  it('short-circuits on the first match', () => {
    const seen: number[] = [];

    find([10, 20, 30, 40], (value) => {
      seen.push(value);
      return value === 20;
    });

    expect(seen).toStrictEqual([10, 20]);
  });

  it('works on Sets', () => {
    expect(find(new Set(['a', 'bb', 'ccc']), (value) => value.length === 2)).toBe('bb');
  });

  it('narrows the type when given a type-guard predicate', () => {
    const items: (string | number)[] = ['a', 1, 'b'];
    const result = find(items, (value) => typeof value === 'number');

    expect(result).toBe(1);
  });

  it('works on generators', () => {
    expect(find(oneToThree(), (value) => value === 2)).toBe(2);
  });
});
