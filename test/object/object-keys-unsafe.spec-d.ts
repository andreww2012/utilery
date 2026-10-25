import {objectKeysUnsafe} from '../../src/object/object-keys-unsafe.ts';

declare const symbolKey: unique symbol;

enum Color {
  Red = 'red',
}

const readKnownKeys = <T extends {a: number; b?: string}>(value: T) =>
  objectKeysUnsafe(value).map((key) => value[key]);

const readIndexSignature = <T extends Record<string, number>>(value: T) =>
  objectKeysUnsafe(value).map((key) => value[key]);

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the keys of a generic object are tested
const readAnyObject = <T extends object>(value: T, other: {a: number}) =>
  objectKeysUnsafe(value).map((key): [string, number, unknown, unknown] => [
    key.toUpperCase(),
    // @ts-expect-error the keys are strings
    key,
    // @ts-expect-error the keys are not known to be keys of `T`
    value[key],
    // @ts-expect-error the keys are not known to be keys of another object
    other[key],
  ]);

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the keys of a generic object are tested
const readConstrained = <T extends {a: number}>(value: T): 'a'[] => objectKeysUnsafe(value);

describe('object/objectKeysUnsafe', () => {
  it('types the keys of the object', () => {
    expectTypeOf(objectKeysUnsafe({a: 1, b: 'x'})).toEqualTypeOf<('a' | 'b')[]>();
    expectTypeOf(objectKeysUnsafe<Record<string, number>>).returns.toEqualTypeOf<string[]>();
    expectTypeOf(objectKeysUnsafe<Record<Color, number>>).returns.toEqualTypeOf<Color[]>();
  });

  it('types number keys as strings and skips symbol keys', () => {
    expectTypeOf(objectKeysUnsafe<{1: 'one'; a: 2; [symbolKey]: 3}>).returns.toEqualTypeOf<
      ('1' | 'a')[]
    >();
    expectTypeOf(objectKeysUnsafe<Record<number, boolean>>).returns.toEqualTypeOf<`${number}`[]>();
  });

  it('types the keys of arrays and tuples', () => {
    expectTypeOf(objectKeysUnsafe(['a', 1] as const)).toEqualTypeOf<('0' | '1')[]>();
    expectTypeOf(objectKeysUnsafe<string[]>).returns.toEqualTypeOf<`${number}`[]>();
    expectTypeOf(objectKeysUnsafe<[boolean, ...string[]]>).returns.toEqualTypeOf<`${number}`[]>();
    expectTypeOf(objectKeysUnsafe<string[] & {extra: number}>).returns.toEqualTypeOf<
      (`${number}` | 'extra')[]
    >();
  });

  it('skips the items and methods of maps and sets', () => {
    expectTypeOf(objectKeysUnsafe<Map<string, number> & {extra: boolean}>).returns.toEqualTypeOf<
      'extra'[]
    >();
    expectTypeOf(objectKeysUnsafe<ReadonlySet<string>>).returns.toEqualTypeOf<never[]>();
    expectTypeOf(objectKeysUnsafe<{get: 1; size: 2}>).returns.toEqualTypeOf<('get' | 'size')[]>();
  });

  it('types the keys of each union member', () => {
    expectTypeOf(objectKeysUnsafe<{a: 1} | {b: 2}>).returns.toEqualTypeOf<('a' | 'b')[]>();
    expectTypeOf(objectKeysUnsafe<{a: 1} | number[]>).returns.toEqualTypeOf<
      ('a' | `${number}`)[]
    >();
  });

  it('lets the keys index a generic object with known keys or an index signature', () => {
    expectTypeOf(readKnownKeys({a: 1})).toEqualTypeOf<number[]>();
    expectTypeOf(readIndexSignature({a: 1})).toEqualTypeOf<number[]>();
  });

  it('types the keys of a generic object as strings', () => {
    expectTypeOf(readAnyObject).toBeFunction();
  });

  it('types the keys of a generic object as for a value of its constraint', () => {
    expectTypeOf(readConstrained({a: 1, b: 'x'})).toEqualTypeOf<'a'[]>();
  });
});
