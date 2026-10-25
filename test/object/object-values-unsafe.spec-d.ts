import {objectValuesUnsafe} from '../../src/object/object-values-unsafe.ts';

declare const symbolKey: unique symbol;

const readAnyObject = <T extends object>(value: T) =>
  objectValuesUnsafe(value).map((item): [T[keyof T], number] => [
    item,
    // @ts-expect-error the values are not known to be numbers
    item,
  ]);

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the values of a generic object are tested
const readConstrained = <T extends {a: number}>(value: T): number[] => objectValuesUnsafe(value);

describe('object/objectValuesUnsafe', () => {
  it('types the values of the object', () => {
    expectTypeOf(objectValuesUnsafe({a: 1, b: 'x'})).toEqualTypeOf<(number | string)[]>();
    expectTypeOf(objectValuesUnsafe<{a: 1; [symbolKey]: 2}>).returns.toEqualTypeOf<1[]>();
  });

  it('includes `undefined` in the values of optional properties', () => {
    expectTypeOf(objectValuesUnsafe<{name: string; age?: number}>).returns.toEqualTypeOf<
      (number | string | undefined)[]
    >();
  });

  it('types the values of arrays and tuples', () => {
    expectTypeOf(objectValuesUnsafe(['a', 1] as const)).toEqualTypeOf<('a' | 1)[]>();
    expectTypeOf(objectValuesUnsafe<[1, 2?]>).returns.toEqualTypeOf<(1 | 2 | undefined)[]>();
    expectTypeOf(objectValuesUnsafe<string[]>).returns.toEqualTypeOf<string[]>();
    expectTypeOf(objectValuesUnsafe<string[] & {extra: number}>).returns.toEqualTypeOf<
      (number | string)[]
    >();
  });

  it('skips the items and methods of maps and sets', () => {
    expectTypeOf(objectValuesUnsafe<Map<string, number> & {extra: boolean}>).returns.toEqualTypeOf<
      boolean[]
    >();
    expectTypeOf(objectValuesUnsafe<ReadonlySet<string>>).returns.toEqualTypeOf<never[]>();
  });

  it('types the values of each union member', () => {
    expectTypeOf(objectValuesUnsafe<{a: 1} | {b: 2}>).returns.toEqualTypeOf<(1 | 2)[]>();
  });

  it('keeps the values of a generic object from being assigned to anything', () => {
    expectTypeOf(readAnyObject).toBeFunction();
  });

  it('types the values of a generic object as for a value of its constraint', () => {
    expectTypeOf(readConstrained({a: 1, b: 'x'})).toEqualTypeOf<number[]>();
  });
});
