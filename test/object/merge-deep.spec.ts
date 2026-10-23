import {mergeDeep} from '../../src/object/merge-deep.ts';

const concatArrays = (targetValue: unknown, sourceValue: unknown) => {
  return Array.isArray(targetValue) && Array.isArray(sourceValue)
    ? [...(targetValue as unknown[]), ...(sourceValue as unknown[])]
    : undefined;
};

describe('object/mergeDeep', () => {
  it('deeply merges and mutates the target by default', () => {
    const target = {a: 1, b: {x: 1}};
    const result = mergeDeep(target, {b: {y: 2}, c: 3});

    expect(result).toBe(target);
    expect(result).toStrictEqual({a: 1, b: {x: 1, y: 2}, c: 3});
  });

  it('returns a new object without mutating the target when {copy: true}', () => {
    const target = {a: {x: 1}};
    const result = mergeDeep(target, {a: {y: 2}}, {copy: true});

    expect(result).not.toBe(target);
    expect(target).toStrictEqual({a: {x: 1}});
    expect(result).toStrictEqual({a: {x: 1, y: 2}});
  });

  it('uses the mergeValues resolver', () => {
    const result = mergeDeep({list: [1, 2]}, {list: [3]}, {mergeValues: concatArrays});

    expect(result).toStrictEqual({list: [1, 2, 3]});
  });

  it('combines {copy: true} with mergeValues', () => {
    const target = {list: [1, 2]};
    const result = mergeDeep(target, {list: [3]}, {copy: true, mergeValues: concatArrays});

    expect(result).toStrictEqual({list: [1, 2, 3]});
    expect(target).toStrictEqual({list: [1, 2]});
  });
});
