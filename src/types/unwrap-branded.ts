import type {UnwrapTagged} from 'type-fest';
import type {Branded} from './branded.ts';

/**
 * The underlying type of a `Branded` type, without its tags.
 * Handy to use the values of a branded type as object keys.
 * A type that is not branded is a compile error.
 * @example
 * type AccountType = Branded<'savings' | 'checking', 'AccountType'>;
 * const balances: Record<UnwrapBranded<AccountType>, number> = {savings: 99, checking: 0};
 * // @ts-expect-error: not a branded type
 * type Invalid = UnwrapBranded<string>;
 */
export type UnwrapBranded<TaggedType extends Branded<unknown, PropertyKey, unknown>> =
  UnwrapTagged<TaggedType>;
