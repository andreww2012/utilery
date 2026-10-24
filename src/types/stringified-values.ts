import type {Stringified} from 'type-fest';
import type {Prettify} from './prettify.ts';

/**
 * An object type with the same keys, where every value type is `string`.
 * Handy for form models, where inputs hold strings.
 * @example
 * type Car = {model: string; speed: number};
 * const form: StringifiedValues<Car> = {model: 'Foo', speed: '101'};
 */
export type StringifiedValues<ObjectType> = Prettify<Stringified<ObjectType>>;
