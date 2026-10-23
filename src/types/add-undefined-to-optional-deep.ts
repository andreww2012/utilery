import type {UndefinedOnPartialDeep} from 'type-fest';

/**
 * Adds `undefined` to the type of every optional property, at any depth.
 * Only matters with the `exactOptionalPropertyTypes` compiler option: then
 * `{a: undefined}` is not assignable to `{a?: number}` unless the property type
 * includes `undefined`.
 * @example
 * type Settings = {
 *   size?: number;
 *   theme: {color?: string};
 * };
 * const settings: AddUndefinedToOptionalDeep<Settings> = {
 *   size: undefined,
 *   theme: {color: undefined},
 * };
 */
export type AddUndefinedToOptionalDeep<T> = UndefinedOnPartialDeep<T>;
