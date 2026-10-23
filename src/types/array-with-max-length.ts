/**
 * Every shape `TArray` can take once it is known to hold no more than `TMaxLength` elements: a
 * union of tuples of length `0` through `TMaxLength` that keeps the element type of each position.
 * Shapes `TArray` can never actually take are dropped, so an input whose required elements alone
 * already exceed `TMaxLength` resolves to `never`.
 * `readonly` is carried over to every member of the union.
 * A non-literal `TMaxLength` constrains nothing and yields `TArray` unchanged.
 * @example
 * type A = ArrayWithMaxLength<number[], 2>;
 * //=> [] | [number] | [number, number]
 * @example
 * // Positions keep their own types, and impossible lengths are dropped
 * type B = ArrayWithMaxLength<[string, ...number[]], 2>;
 * //=> [string] | [string, number]
 * @example
 * // Three elements can never fit into two
 * type C = ArrayWithMaxLength<[string, number, boolean], 2>;
 * //=> never
 */
export type ArrayWithMaxLength<
  TArray extends readonly unknown[],
  TMaxLength extends number,
> = number extends TMaxLength
  ? TArray
  : Truncate<TArray, TMaxLength, [], never, TArray extends unknown[] ? false : true>;

/**
 * Walks `TArray` one element at a time, collecting into `TAccumulator` and banking a union member
 * into `TResult` at every length the input is allowed to stop at.
 * Both recursive branches are bare calls so TypeScript's tail-call elimination applies; building
 * the union inside either branch instead would cap `TMaxLength` at ~47
 */
type Truncate<
  TArray extends readonly unknown[],
  TMaxLength extends number,
  TAccumulator extends unknown[],
  TResult extends readonly unknown[],
  TIsReadonly extends boolean,
> = TArray extends readonly []
  ? TResult | WithReadonly<TAccumulator, TIsReadonly>
  : TAccumulator['length'] extends TMaxLength
    ? TArray extends readonly [unknown, ...unknown[]]
      ? TResult
      : TResult | WithReadonly<TAccumulator, TIsReadonly>
    : TArray extends readonly [infer THead, ...infer TTail]
      ? Truncate<TTail, TMaxLength, [...TAccumulator, THead], TResult, TIsReadonly>
      : TArray extends readonly [(infer THead)?, ...infer TTail]
        ? Truncate<
            TTail,
            TMaxLength,
            [...TAccumulator, THead],
            TResult | WithReadonly<TAccumulator, TIsReadonly>,
            TIsReadonly
          >
        : TResult | WithReadonly<TAccumulator, TIsReadonly>;

// Spelled out as a tuple rather than `Readonly<...>` so every leaf stays visibly an
// array type: a type predicate is only assignable to its parameter when
// TypeScript can see that without resolving the conditional
type WithReadonly<TTuple extends unknown[], TIsReadonly extends boolean> = TIsReadonly extends true
  ? readonly [...TTuple]
  : TTuple;
