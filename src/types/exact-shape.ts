import type {Exact} from 'type-fest';

/**
 * Rejects the properties of `InputType` that `ParameterType` does not declare,
 * at any depth.
 * TypeScript only rejects unknown properties in an object literal, not in a
 * variable passed as an argument: constrain a type parameter with
 * `ExactShape` to reject them there too.
 * @example
 * type Options = {name: string};
 * declare function configure<T extends ExactShape<Options, T>>(options: T): void;
 *
 * const options = {name: 'app', debug: true};
 * // @ts-expect-error: `debug` is not declared
 * configure(options);
 */
export type ExactShape<ParameterType, InputType> = Exact<ParameterType, InputType>;
