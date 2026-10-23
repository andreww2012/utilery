import type {DeepConstantKeys} from 'string-ts';

/**
 * Converts the keys of an object type to CONSTANT_CASE (see
 * `ToConstantCase`), at any depth, including in arrays.
 * For the top-level keys only, use `ToConstantCaseKeys`.
 * @example
 * type A = ToConstantCaseKeysDeep<{userInfo: {userId: number}}>;
 * //=> {USER_INFO: {USER_ID: number}}
 */
export type ToConstantCaseKeysDeep<T> = DeepConstantKeys<T>;
