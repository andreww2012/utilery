import type {GetTagMetadata} from 'type-fest';
import type {Branded} from './branded.ts';

/**
 * The metadata of the tag `TagName` of a `Branded` type.
 * Metadata lets a brand carry more information, like the type a JSON string
 * parses to.
 * @example
 * type JsonOf<T> = Branded<string, 'Json', T>;
 *
 * const toJson = <T>(value: T) => JSON.stringify(value) as JsonOf<T>;
 * const fromJson = <T extends JsonOf<unknown>>(json: T) =>
 *   JSON.parse(json) as GetBrandMetadata<T, 'Json'>;
 *
 * const parsed = fromJson(toJson({hello: 'world'}));
 * //=> {hello: string}
 */
export type GetBrandMetadata<
  Type extends Branded<unknown, TagName, unknown>,
  TagName extends PropertyKey,
> = GetTagMetadata<Type, TagName>;
