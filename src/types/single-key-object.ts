import type {SingleKeyObject as SingleKeyObjectBase} from 'type-fest';

/**
 * `ObjectType` if it has exactly one key, otherwise `never`.
 * Use it in a parameter type to only accept objects with a single key.
 * @example
 * declare function setOption<T>(option: SingleKeyObject<T>): void;
 * setOption({debug: true});
 * // @ts-expect-error: two keys
 * setOption({debug: true, verbose: true});
 */
export type SingleKeyObject<ObjectType> = SingleKeyObjectBase<ObjectType>;
