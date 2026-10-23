import type {AbstractClass as AbstractClassBase} from 'type-fest';

/**
 * An abstract class of instances of type `T`: an abstract constructor with the
 * given constructor `Arguments`, and a `prototype` with the members of `T`.
 * For a class that can be instantiated, use `Class`.
 * @example
 * abstract class Shape {
 *   abstract area(): number;
 * }
 * const shapeClasses: AbstractClass<Shape>[] = [Shape];
 */
// eslint-disable-next-line ts/no-explicit-any -- any constructor arguments by default, as `unknown[]` would reject typed ones
export type AbstractClass<T, Arguments extends unknown[] = any[]> = AbstractClassBase<T, Arguments>;
