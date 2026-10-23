import type {ReadonlyDeep as ReadonlyDeepBase} from 'type-fest';

/**
 * Makes a type `readonly` at any depth: the properties of objects, the elements
 * of arrays, maps and sets.
 * Handy to share a structure that must not be changed, like a config or an
 * API response.
 * Types with overloaded functions are not changed deeply, because of a
 * TypeScript limitation.
 * For the top level only, use `Readonly`.
 * To remove `readonly` at any depth, use `StripReadonlyDeep`.
 * @example
 * declare const config: ReadonlyDeep<{server: {port: number}; hosts: string[]}>;
 * // @ts-expect-error: readonly
 * config.server.port = 80;
 * // @ts-expect-error: `push` does not exist on a readonly array
 * config.hosts.push('localhost');
 */
export type ReadonlyDeep<T> = ReadonlyDeepBase<T>;
