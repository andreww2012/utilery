import type {ConditionalSimplify} from 'type-fest';

/**
 * Flattens an intersection of object types into one object type, except for
 * the types assignable to `ExcludeType`, and only for the types assignable to
 * `IncludeType`.
 * See `Prettify`.
 * @example
 * type A = PrettifyConditional<{a: number} & {b: string}, never, object>;
 * //=> {a: number; b: string}
 * type B = PrettifyConditional<Set<number> & Set<string>, Set<unknown>, object>;
 * //=> Set<number> & Set<string>
 */
export type PrettifyConditional<
  Type,
  ExcludeType = never,
  IncludeType = unknown,
> = ConditionalSimplify<Type, ExcludeType, IncludeType>;
