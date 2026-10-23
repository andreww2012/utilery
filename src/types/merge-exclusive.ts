import type {MergeExclusive as MergeExclusiveBase} from 'type-fest';

/**
 * An object type that is either `FirstType` or `SecondType`, but not both: the
 * keys of the other one must be absent.
 * For any number of types, use `MutuallyExclusiveUnion`.
 * @example
 * type Source = MergeExclusive<{url: string}, {path: string}>;
 * const a: Source = {url: 'https://example.com'};
 * const b: Source = {path: './file'};
 * // @ts-expect-error: both keys
 * const c: Source = {url: 'https://example.com', path: './file'};
 */
export type MergeExclusive<FirstType, SecondType> = MergeExclusiveBase<FirstType, SecondType>;
