import type {Merge} from 'type-fest';

/**
 * Merges two types, where the properties of `Source` replace those of
 * `Destination`.
 * Unlike an intersection (`&`), where a property of both types gets the
 * intersection of their types, often `never`, the type of `Source` wins.
 * The result is flattened, so it reads well in IDE tooltips.
 * For a merge that takes index signatures into account like object spread
 * does, use `MergeObjects`.
 * @example
 * type A = MergeTypes<{a: string; b: number}, {a: number; c: boolean}>;
 * //=> {a: number; b: number; c: boolean}
 * type B = ({a: string} & {a: number})['a'];
 * //=> never
 */
export type MergeTypes<Destination, Source> = Merge<Destination, Source>;
