import type {Tagged} from 'type-fest';

/**
 * A branded type: `Type` with a tag, so that a value of a plain `Type` (or of
 * a type with another tag) is not assignable to it without a cast, while it is
 * still usable as a plain `Type`.
 * Handy to tell apart values of the same type, like user IDs and order IDs.
 *
 * A branded type can be branded again to get several tags, and each tag can
 * have metadata (see `GetBrandMetadata`).
 * A branded type is assignable to another one when its underlying type is,
 * when it has all the tags of the other one, and when the metadata of each of
 * them is assignable.
 * To get the underlying type, use `UnwrapBranded`.
 * @example
 * type UserId = Branded<number, 'UserId'>;
 * type OrderId = Branded<number, 'OrderId'>;
 *
 * declare function getUser(id: UserId): User;
 * const userId = 1 as UserId;
 * getUser(userId);
 * // @ts-expect-error: not a `UserId`
 * getUser(1 as OrderId);
 * userId + 1; // still a number
 * @example
 * // Several tags
 * type Url = Branded<string, 'Url'>;
 * type ApiUrl = Branded<Url, 'ApiUrl'>;
 */
export type Branded<Type, TagName extends PropertyKey, TagMetadata = never> = Tagged<
  Type,
  TagName,
  TagMetadata
>;
