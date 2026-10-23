import type {RequireAtLeastOne as RequireAtLeastOneBase} from 'type-fest';

/**
 * Requires at least one of the given keys of an object type (all of them by
 * default), keeping the other keys as they are.
 * For exactly one, use `RequireExactlyOne`.
 * @example
 * type Contact = {email?: string; phone?: string; name: string};
 * type ReachableContact = RequireAtLeastOne<Contact, 'email' | 'phone'>;
 * const a: ReachableContact = {name: 'Ada', phone: '123'};
 * // @ts-expect-error: neither `email` nor `phone`
 * const b: ReachableContact = {name: 'Bob'};
 */
export type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = RequireAtLeastOneBase<ObjectType, KeysType>;
