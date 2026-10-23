import type {Constructor as ConstructorBase} from 'type-fest';

/**
 * A constructor of instances of type `T`, with the given constructor
 * `Arguments`.
 * For abstract classes, use `AbstractConstructor`.
 * @example
 * const create = <T>(Constructor: Constructor<T>) => new Constructor();
 * const date = create(Date);
 * //=> Date
 */
// eslint-disable-next-line ts/no-explicit-any -- any constructor arguments by default, as `unknown[]` would reject typed ones
export type Constructor<T, Arguments extends unknown[] = any[]> = ConstructorBase<T, Arguments>;
