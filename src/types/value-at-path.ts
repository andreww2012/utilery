import type {Get, LiteralUnion, Paths} from 'type-fest';

/** Options of `ValueAtPath` */
export interface ValueAtPathOptions {
  /**
   * Adds `undefined` to the result when a property on the way may be missing,
   * like an array element or a key of a record.
   * Turning it off is not recommended.
   * Defaults to `true`
   */
  strict?: boolean;
}

type ToString<T> = T extends string | number ? `${T}` : never;

/**
 * The type of the value at a deep path of an object type, like
 * `'a.b[0].c'`, or at an array of path segments.
 * IDEs suggest paths of up to three keys, like `'a.b.c'`.
 * @example
 * type Response = {hits: {items: {id: string; tags: string[]}[]}};
 * type A = ValueAtPath<Response, 'hits.items[0].tags'>;
 * //=> string[] | undefined
 * type B = ValueAtPath<Response, ['hits', 'items']>;
 * //=> {id: string; tags: string[]}[]
 * @example
 * type C = ValueAtPath<string[], '3', {strict: false}>;
 * //=> string
 */
export type ValueAtPath<
  BaseType,
  Path extends
    | readonly string[]
    | LiteralUnion<
        ToString<
          | Paths<BaseType, {bracketNotation: false; maxRecursionDepth: 2}>
          | Paths<BaseType, {bracketNotation: true; maxRecursionDepth: 2}>
        >,
        string
      >,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ValueAtPathOptions = {},
> = Get<BaseType, Path, Options>;
