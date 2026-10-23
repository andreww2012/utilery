import type {RequiredDeep as RequiredDeepBase} from 'type-fest';

/**
 * Makes every property of a type required, at any depth, like a deep
 * `Required`.
 * An explicit `undefined` in a property type is removed too, unless the
 * `exactOptionalPropertyTypes` compiler option is on.
 * Types with overloaded functions are not changed deeply, because of a
 * TypeScript limitation.
 * @example
 * type Settings = {editor?: {fontSize?: number; theme?: string | undefined}; autosave?: boolean};
 * type A = RequiredDeep<Settings>;
 * //=> {editor: {fontSize: number; theme: string}; autosave: boolean}
 */
export type RequiredDeep<T> = RequiredDeepBase<T>;
