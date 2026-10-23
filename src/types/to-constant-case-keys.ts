import type {ConstantKeys} from 'string-ts';

/**
 * Converts the top-level keys of an object type to CONSTANT_CASE (see
 * `ToConstantCase`).
 * The type-level counterpart of `toConstantCaseKeys`.
 * For nested keys too, use `ToConstantCaseKeysDeep`.
 * @example
 * type A = ToConstantCaseKeys<{userId: number; 'user-name': string}>;
 * //=> {USER_ID: number; USER_NAME: string}
 */
export type ToConstantCaseKeys<T> = ConstantKeys<T>;
