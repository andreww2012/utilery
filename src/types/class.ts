import type {Class as ClassBase} from 'type-fest';

/**
 * A class of instances of type `T`: a constructor with the given constructor
 * `Arguments`, and a `prototype` with the members of `T`.
 * For abstract classes, use `AbstractClass`.
 * @example
 * const create = <T>(Constructor: Class<T, [name: string]>, name: string) => new Constructor(name);
 */
// eslint-disable-next-line ts/no-explicit-any -- any constructor arguments by default, as `unknown[]` would reject typed ones
export type Class<T, Arguments extends unknown[] = any[]> = ClassBase<T, Arguments>;
