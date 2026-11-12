/** A function with any parameters */
export type AnyFunction = (...arguments_: never[]) => unknown;

/** The first function of a tuple, or the type of every function of an array */
export type FirstFunction<Functions extends readonly AnyFunction[]> = Functions extends readonly [
  infer First extends AnyFunction,
  ...unknown[],
]
  ? First
  : Functions[number];

/** The last function of a tuple, or the type of every function of an array */
export type LastFunction<Functions extends readonly AnyFunction[]> = Functions extends readonly [
  ...unknown[],
  infer Last extends AnyFunction,
]
  ? Last
  : Functions[number];
