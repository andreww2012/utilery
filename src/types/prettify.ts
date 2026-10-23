import type {Simplify} from 'type-fest';

/**
 * Flattens an intersection of object types into one object type, so that it
 * reads well in IDE tooltips.
 * It also turns an interface into a type, which makes it assignable to types
 * with an index signature, like `Record<string, unknown>`: interfaces are not,
 * as they can be extended later.
 * For nested types too, use `PrettifyDeep`.
 * @example
 * type Props = Prettify<{top: number; left: number} & {width: number}>;
 * //=> {top: number; left: number; width: number}
 * @example
 * interface Options {
 *   size: number;
 * }
 * declare function send(data: Record<string, unknown>): void;
 * declare const options: Options;
 * send(options as Prettify<Options>);
 */
export type Prettify<T> = Simplify<T>;
