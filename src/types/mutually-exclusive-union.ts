// cspell:ignore exclusify
import type {ExclusifyUnion} from 'type-fest';

/**
 * Makes the members of a union of object types mutually exclusive: each member
 * gets the keys of the other members as optional `never` properties.
 * This rejects objects that mix the members, and lets you read any of the keys
 * without narrowing first.
 * For two types, `MergeExclusive` does the same.
 * @example
 * type Config = MutuallyExclusiveUnion<{filePath: string} | {content: string}>;
 * //=> {filePath: string; content?: never} | {content: string; filePath?: never}
 *
 * const config: Config = {filePath: './config.json'};
 * // @ts-expect-error: both keys
 * const invalid: Config = {filePath: './config.json', content: '{}'};
 * @example
 * declare const payment: MutuallyExclusiveUnion<{cardNumber: string} | {paypalId: string}>;
 * const id = payment.cardNumber ?? payment.paypalId;
 * //=> string
 */
export type MutuallyExclusiveUnion<Union> = ExclusifyUnion<Union>;
