import type {AbstractConstructor as AbstractConstructorBase} from 'type-fest';

/**
 * An abstract constructor of instances of type `T`, with the given constructor
 * `Arguments`.
 * A class that is not abstract matches too.
 * For a constructor that can be called with `new`, use `Constructor`.
 * @example
 * abstract class Shape {
 *   abstract area(): number;
 * }
 * const isShapeClass = (value: Function): value is AbstractConstructor<Shape> =>
 *   value.prototype instanceof Shape;
 */
export type AbstractConstructor<
  T,
  // eslint-disable-next-line ts/no-explicit-any -- any constructor arguments by default, as `unknown[]` would reject typed ones
  Arguments extends unknown[] = any[],
> = AbstractConstructorBase<T, Arguments>;
