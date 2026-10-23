import type {Except} from 'type-fest';

/** Options of `OmitStrict` */
export interface OmitStrictOptions {
  /**
   * Rejects objects that still have the removed properties, by typing them as
   * optional `never` (they then show up in autocompletion as `undefined`).
   * Defaults to `false`
   */
  requireExactProps?: boolean;
}

/**
 * Removes properties from an object type, like `Omit`, but only accepts keys
 * that exist in the type, so that typos and renamed properties are compile
 * errors.
 * Unlike `Omit`, it keeps the other properties of a type with an index
 * signature.
 * For a union of object types, use `OmitDistributed`.
 * @example
 * type User = {id: number; name: string; email: string};
 * type A = OmitStrict<User, 'email'>;
 * //=> {id: number; name: string}
 * // @ts-expect-error: `mail` is not a key of `User`
 * type B = OmitStrict<User, 'mail'>;
 * @example
 * type UserData = {[key: string]: string; email: string; name: string};
 * type C = Omit<UserData, 'email'>;
 * //=> {[key: string]: string; [key: number]: string}
 * type D = OmitStrict<UserData, 'email'>;
 * //=> {[key: string]: string; name: string}
 * @example
 * type PublicUser = OmitStrict<User, 'email', {requireExactProps: true}>;
 * const user: PublicUser = {id: 1, name: 'Ada'};
 * // @ts-expect-error: `email` is removed
 * const invalid: PublicUser = {id: 1, name: 'Ada', email: ''};
 */
export type OmitStrict<
  ObjectType,
  KeysType extends keyof ObjectType,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends OmitStrictOptions = {},
> = Except<ObjectType, KeysType, Options>;
