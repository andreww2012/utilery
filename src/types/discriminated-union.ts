import type {TaggedUnion} from 'type-fest';

/**
 * A discriminated union: one object type per entry of `UnionMembers`, with the
 * fields of the entry and a `TagKey` property set to the entry's key.
 * A shorter way to write a union of object types that share a discriminant
 * property.
 * @example
 * type Event = DiscriminatedUnion<'type', {
 *   click: {x: number; y: number};
 *   keyPress: {key: string};
 * }>;
 * //=> {type: 'click'; x: number; y: number} | {type: 'keyPress'; key: string}
 */
export type DiscriminatedUnion<
  TagKey extends string,
  UnionMembers extends Record<string, Record<string, unknown>>,
> = TaggedUnion<TagKey, UnionMembers>;
