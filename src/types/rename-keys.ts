import type {RenameKeys as RenameKeysBase} from 'type-fest';

/**
 * Renames the keys of an object type according to a map from old names to new
 * names.
 * When several keys get the same new name, the new key has the union of their
 * value types.
 * It is optional only when all of them are optional, and `readonly` when any of
 * them is `readonly`.
 * A union of new names gives one key per member.
 * An entry whose new name is not a literal, or whose old name is not a key of
 * the type, is ignored.
 * @example
 * type User = {id: string; firstName: string; createdAt: Date};
 * type A = RenameKeys<User, {firstName: 'first_name'; createdAt: 'created_at'}>;
 * //=> {id: string; first_name: string; created_at: Date}
 * @example
 * type B = RenameKeys<{text: string; voice: Blob}, {text: 'query'; voice: 'query'}>;
 * //=> {query: string | Blob}
 */
export type RenameKeys<
  BaseType extends object,
  RenameMap extends Record<PropertyKey, PropertyKey>,
> = RenameKeysBase<BaseType, RenameMap>;
