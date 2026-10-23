import type {Writable} from 'type-fest';

/**
 * Removes `readonly` from the given properties of an object type (all of them
 * by default), or makes a readonly array, map or set writable.
 * The opposite of `Readonly`.
 * Only the top level is changed: for nested values too, use
 * `StripReadonlyDeep`.
 * @example
 * type Foo = {readonly a: number; readonly b: readonly string[]};
 * type A = StripReadonly<Foo>;
 * //=> {a: number; b: readonly string[]}
 * type B = StripReadonly<Foo, 'a'>;
 * //=> {a: number; readonly b: readonly string[]}
 * type C = StripReadonly<readonly number[]>;
 * //=> number[]
 */
export type StripReadonly<BaseType, Keys extends keyof BaseType = keyof BaseType> = Writable<
  BaseType,
  Keys
>;
