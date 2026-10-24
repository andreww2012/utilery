import type {PrettifyConditional} from '../types/prettify-conditional.ts';

/**
 * Recursively unwraps a (possibly deeply) nested array type to its innermost
 * element type, e.g. `ExtractNestedArrayType<number[][]>` is `number`
 */
export type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;

/**
 * Keeps the precise `Cased` literal type when `S` is a string literal, but
 * widens to `string` when `S` is the non-literal `string`, so case converters
 * return a plain `string` for dynamic inputs instead of leaking a partially
 * resolved type like `Lowercase<string>`
 */
export type WidenNonLiteral<S extends string, Cased extends string> = string extends S
  ? string
  : Cased;

/**
 * `Prettify` that keeps `any`, `unknown`, primitives and functions as they
 * are, where `Prettify` gives `{[key: string]: any}`, `{}` and objects
 * without call signatures
 */
// eslint-disable-next-line ts/no-unsafe-function-type -- any function, which would lose its call signatures
export type PrettifyObject<T> = PrettifyConditional<T, Function, object>;
