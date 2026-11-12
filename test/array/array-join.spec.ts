import {arrayJoin} from '../../src/array/array-join.ts';

describe('array/arrayJoin', () => {
  it('basic test', () => {
    expect(arrayJoin(['a', 'b', 'c'], '-')).toBe('a-b-c');
  });

  it('joins with a comma without a delimiter', () => {
    expect(arrayJoin(['a', 'b', 'c'])).toBe('a,b,c');
    expect(arrayJoin(['a', 'b', 'c'], undefined)).toBe('a,b,c');
  });

  it('turns `null` and `undefined` into empty strings', () => {
    expect(arrayJoin(['a', null, undefined, 'b'], '.')).toBe('a...b');
  });

  it('throws a `TypeError` for an element that can not be converted to a string', () => {
    const values: unknown[] = ['a', Symbol('b')];

    expect(() => arrayJoin(values)).toThrow(TypeError);
    expect(() => arrayJoin([[Symbol('a')]], '.')).toThrow(TypeError);
    expect(() => arrayJoin([Object.create(null)], '.')).toThrow(TypeError);
  });

  it('converts elements with no literal form to strings', () => {
    expect(arrayJoin([{a: 1}, ['b', 'c'], '😀'], ' | ')).toBe('[object Object] | b,c | 😀');
  });
});
