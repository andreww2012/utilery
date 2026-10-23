import type {ConditionalSimplifyDeep} from 'type-fest';

/**
 * Flattens an intersection of object types into one object type, at any
 * depth, except for the types assignable to `ExcludeType`, and only for the
 * types assignable to `IncludeType`.
 * See `PrettifyDeep`.
 * @example
 * type A = {foo: {a: string; data: Map<string, number>}};
 * type B = {foo: {b: string; data: Map<number, string>}};
 * type C = PrettifyConditionalDeep<A & B, Map<unknown, unknown>, object>;
 * //=> {foo: {a: string; b: string; data: Map<string, number> & Map<number, string>}}
 */
export type PrettifyConditionalDeep<
  Type,
  ExcludeType = never,
  IncludeType = unknown,
> = ConditionalSimplifyDeep<Type, ExcludeType, IncludeType>;
