import type {GlobalThis as GlobalThisBase} from 'type-fest';

/**
 * The type of `globalThis`, to extend with your own globals and cast
 * `globalThis` to, without casting through `unknown`.
 * @example
 * type AppGlobals = GlobalThis & {
 *   readonly APP_TOKEN: string;
 * };
 * const token = (globalThis as AppGlobals).APP_TOKEN;
 * //=> string
 */
export type GlobalThis = GlobalThisBase;
