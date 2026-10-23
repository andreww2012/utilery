import {type MergeAll, mergeAll} from 'remeda';

/**
 * Shallow-merges a non-empty array of objects into a single object, with later
 * objects overriding earlier ones (like `Object.assign({}, ...objects)`).
 * The result type is the precise positional merge of the element types, which a
 * plain `Object.assign` over a spread array cannot produce.
 *
 * For a deep merge of two objects use `mergeDeep`; for a statically-known set of
 * objects the spread `{...a, ...b}` is simpler.
 * @param objects - A non-empty array of objects to merge, left to right.
 * @returns A new object with the merged properties.
 * @example
 * // Later objects override earlier ones
 * mergeObjects([{a: 1}, {b: 2}, {a: 3}]);
 * // {a: 3, b: 2}
 * @example
 * // Heterogeneous element types merge into a precise type
 * mergeObjects([{a: 1}, {b: 'x'}]);
 * // {a: 1, b: 'x'}
 */
// Cast because remeda's overloads resolve to `{}` for an abstract generic `T`;
// the runtime merge is correct and `MergeAll<T>` evaluates per-call-site
export const mergeObjects = <T extends readonly [object, ...object[]]>(objects: T): MergeAll<T> =>
  mergeAll(objects) as MergeAll<T>;
