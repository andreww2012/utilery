import type {SimplifyDeep} from 'type-fest';

/**
 * Flattens an intersection of object types into one object type, at any
 * depth, except for the types assignable to `ExcludeType`.
 * Handy to make types read well in IDE tooltips.
 * For the top level only, use `Prettify`.
 * @example
 * type A = {height: number; position: {top: number}};
 * type B = {width: number; position: {left: number}};
 * type C = PrettifyDeep<A & B>;
 * //=> {height: number; width: number; position: {top: number; left: number}}
 */
export type PrettifyDeep<Type, ExcludeType = never> = SimplifyDeep<Type, ExcludeType>;
