import type {KeyAsString} from 'type-fest';

/**
 * The keys of an object type as strings: number keys become string literals,
 * and symbol keys are left out.
 * Handy to index an object with strings, like the ones from template literal
 * types.
 * @example
 * type A = KeysAsStrings<{1: number; name: string}>;
 * //=> 'name' | '1'
 */
export type KeysAsStrings<BaseType> = KeyAsString<BaseType>;
