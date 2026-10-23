import type {Spread as SpreadBase} from 'type-fest';

type Spreadable = object | readonly unknown[];

/**
 * The type of a spread of two object types, `{...first, ...second}`, or of two
 * array types, `[...first, ...second]`, as TypeScript infers it.
 * When a property of `SecondType` is optional, the result has the union of its
 * type and the type of the same property of `FirstType`, as the spread may keep
 * either.
 * @example
 * type A = Spread<{a: number; b?: string}, {b?: number; c: boolean}>;
 * //=> {a: number; b?: string | number; c: boolean}
 * type B = Spread<number[], string[]>;
 * //=> (number | string)[]
 */
export type Spread<FirstType extends Spreadable, SecondType extends Spreadable> = SpreadBase<
  FirstType,
  SecondType
>;
