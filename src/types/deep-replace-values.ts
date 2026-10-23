import type {Schema} from 'type-fest';

/** Options of `DeepReplaceValues` */
export interface DeepReplaceValuesOptions {
  /**
   * Replaces the elements of arrays and tuples one by one.
   * When `false`, a whole array is replaced with the value type.
   * Defaults to `true`
   */
  recurseIntoArrays?: boolean;
}

/**
 * An object type with the same shape, where every value is replaced with the
 * `Value` type, at any depth.
 * Handy to describe a setting for each field of a type, like a validation rule
 * or a visibility.
 * @example
 * type User = {
 *   id: string;
 *   name: {first: string; last: string};
 *   location: [latitude: number, longitude: number];
 * };
 * const visibility: DeepReplaceValues<User, 'show' | 'hide'> = {
 *   id: 'show',
 *   name: {first: 'show', last: 'hide'},
 *   location: ['hide', 'hide'],
 * };
 * @example
 * type Counts = DeepReplaceValues<{attendees: string[]}, number, {recurseIntoArrays: false}>;
 * //=> {attendees: number}
 */
export type DeepReplaceValues<
  Type,
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends DeepReplaceValuesOptions = {},
> = Schema<Type, Value, Options>;
