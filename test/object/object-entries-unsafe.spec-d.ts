import {objectEntriesUnsafe} from '../../src/object/object-entries-unsafe.ts';
import type {OptionalUndefined} from '../exact-optional-property-types.ts';

declare const symbolKey: unique symbol;

enum Color {
  Red = 'red',
}

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the entries of a generic object are tested
const readKnownKeys = <T extends {a: number; b?: string}>(value: T) =>
  objectEntriesUnsafe(value).map(([key]) => value[key]);

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the entries of a generic object are tested
const readIndexSignature = <T extends Record<string, number>>(value: T) =>
  objectEntriesUnsafe(value).map(([key]) => value[key]);

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the entries of a generic object are tested
const readAnyObject = <T extends object>(value: T, other: {a: number}) =>
  objectEntriesUnsafe(value).map(
    ([key, entryValue]): [string, number, number, unknown, unknown] => [
      key,
      // @ts-expect-error the keys are strings
      key,
      // @ts-expect-error the values are not known to be numbers
      entryValue,
      // @ts-expect-error the keys are not known to be keys of `T`
      value[key],
      // @ts-expect-error the keys are not known to be keys of another object
      other[key],
    ],
  );

// eslint-disable-next-line ts/no-unnecessary-type-parameters -- the entries of a generic object are tested
const readConstrained = <T extends {a: number}>(value: T): ['a', number][] =>
  objectEntriesUnsafe(value);

describe('object/objectEntriesUnsafe', () => {
  it('types the keys and values of the object', () => {
    expectTypeOf(objectEntriesUnsafe({a: 1, b: 'x'})).toEqualTypeOf<
      ['a' | 'b', number | string][]
    >();
    expectTypeOf(objectEntriesUnsafe<Record<string, number>>).returns.toEqualTypeOf<
      [string, number][]
    >();
    expectTypeOf(objectEntriesUnsafe<Record<Color, number>>).returns.toEqualTypeOf<
      [Color, number][]
    >();
  });

  it('includes `undefined` in the values of optional properties', () => {
    expectTypeOf(objectEntriesUnsafe<{a?: number; b: string}>).returns.toEqualTypeOf<
      ['a' | 'b', number | string | OptionalUndefined][]
    >();
    expectTypeOf(objectEntriesUnsafe<Partial<Record<'x' | 'y', string[]>>>).returns.toEqualTypeOf<
      ['x' | 'y', string[] | OptionalUndefined][]
    >();
  });

  it('types number keys as strings and skips symbol keys', () => {
    expectTypeOf(objectEntriesUnsafe<{1: 'one'; [symbolKey]: 2}>).returns.toEqualTypeOf<
      ['1', 'one'][]
    >();
    expectTypeOf(objectEntriesUnsafe<Record<number, boolean>>).returns.toEqualTypeOf<
      [`${number}`, boolean][]
    >();
  });

  it('types the entries of arrays and tuples', () => {
    expectTypeOf(objectEntriesUnsafe(['a', 1] as const)).toEqualTypeOf<['0' | '1', 'a' | 1][]>();
    expectTypeOf(objectEntriesUnsafe<[1, 2?]>).returns.toEqualTypeOf<
      ['0' | '1', 1 | 2 | OptionalUndefined][]
    >();
    expectTypeOf(objectEntriesUnsafe<string[]>).returns.toEqualTypeOf<[`${number}`, string][]>();
    expectTypeOf(objectEntriesUnsafe<[boolean, ...string[]]>).returns.toEqualTypeOf<
      [`${number}`, boolean | string][]
    >();
    expectTypeOf(objectEntriesUnsafe<string[] & {extra: number}>).returns.toEqualTypeOf<
      [`${number}` | 'extra', number | string][]
    >();
  });

  it('skips the items and methods of maps and sets', () => {
    expectTypeOf(objectEntriesUnsafe<Map<string, number> & {extra: boolean}>).returns.toEqualTypeOf<
      ['extra', boolean][]
    >();
    expectTypeOf(objectEntriesUnsafe<ReadonlySet<string>>).returns.toEqualTypeOf<never[]>();
    expectTypeOf(objectEntriesUnsafe<{get: 1; size: 2}>).returns.toEqualTypeOf<
      ['get' | 'size', 1 | 2][]
    >();
  });

  it('types the entries of each union member separately', () => {
    expectTypeOf(objectEntriesUnsafe<{a: 1} | {b: 2}>).returns.toEqualTypeOf<
      (['a', 1] | ['b', 2])[]
    >();
    expectTypeOf(objectEntriesUnsafe<{a: 1} | number[]>).returns.toEqualTypeOf<
      (['a', 1] | [`${number}`, number])[]
    >();
  });

  it('lets the keys index a generic object with known keys or an index signature', () => {
    expectTypeOf(readKnownKeys({a: 1})).toEqualTypeOf<(number | string | undefined)[]>();
    expectTypeOf(readIndexSignature({a: 1})).toEqualTypeOf<(number | undefined)[]>();
  });

  it('keeps the keys and values of a generic object from being assigned to anything', () => {
    expectTypeOf(readAnyObject).toBeFunction();
  });

  it('types the entries of a generic object as for a value of its constraint', () => {
    expectTypeOf(readConstrained({a: 1, b: 'x'})).toEqualTypeOf<['a', number][]>();
  });
});
