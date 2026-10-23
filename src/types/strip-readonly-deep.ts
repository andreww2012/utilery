import type {WritableDeep} from 'type-fest';

/**
 * Removes `readonly` from a type at any depth: the properties of objects, the
 * elements of arrays, maps and sets.
 * The opposite of `ReadonlyDeep`.
 * Types with overloaded functions are not changed deeply, because of a
 * TypeScript limitation.
 * For the top level only, use `StripReadonly`.
 * @example
 * type Config = {readonly server: {readonly port: number}; readonly hosts: readonly string[]};
 * const config: StripReadonlyDeep<Config> = {server: {port: 80}, hosts: []};
 * config.server.port = 8080;
 * config.hosts.push('localhost');
 */
export type StripReadonlyDeep<T> = WritableDeep<T>;
