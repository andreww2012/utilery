// cspell:ignore promisable
import type {Promisable} from 'type-fest';

/**
 * A value or a `PromiseLike` of it.
 * Handy for a callback that may be sync or async, like the ones of
 * `Promise.prototype.then`.
 * @example
 * const log = async (getEntry: () => MaybePromise<string>) => {
 *   console.log(await getEntry());
 * };
 * await log(() => 'foo');
 * await log(async () => 'bar');
 */
export type MaybePromise<T> = Promisable<T>;
