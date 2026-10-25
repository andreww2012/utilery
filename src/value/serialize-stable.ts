import {serialize} from 'es-toolkit/util';

/** Serializes any value into a string that doesn't depend on key or insertion order */
export const serializeStable: {
  /**
   * Serializes any value into a string that doesn't depend on the order of keys
   * or insertion: values with the same structure always give the same string, so
   * it works for cache keys and change detection.
   *
   * Object keys, `Map` keys and `Set` values are sorted.
   * Strings are quoted, so `'1'` and `1` give different strings, and so do `1`
   * and `1n`.
   * Dates, regular expressions, typed arrays, `ArrayBuffer`s and errors are
   * written by their contents, class instances by their name and properties (or
   * their `toJSON()` result), and functions by their name and source code.
   * A repeated or circular reference is written as `#ref<n>`, where `n` counts
   * the objects in the order they were first visited.
   * `0` and `-0` give the same string, as do a missing array element and
   * `undefined`.
   *
   * Not suitable for security purposes: different values can be crafted to give
   * the same string, for example with functions or regular expressions.
   * @param value - The value to serialize.
   * @returns The serialized string.
   * @throws {TypeError} When the value contains an object that can't be
   * serialized meaningfully, like a `Promise`, a `WeakMap` or a `Blob`.
   * @example
   * serializeStable({b: 2, a: 1}) === serializeStable({a: 1, b: 2});
   * // true
   * @example
   * serializeStable(new Map([['b', [1, 2n]], ['a', new Set([3, 1])]]));
   * // "Map{'a':Set[1,3],'b':[1,2n]}"
   * @example
   * const node = {name: 'root'};
   * node.self = node;
   * serializeStable(node);
   * // "{'name':'root','self':#ref0}"
   * @example
   * // A short key of a fixed length: the SHA-256 of the string in Base64URL
   * const digest = await crypto.subtle.digest('SHA-256', stringToUint8Array(serializeStable({a: 1})));
   * uint8ArrayToBase64(new Uint8Array(digest), {urlSafe: true});
   * // The same 43 characters for every value with the same structure
   */
  (value: unknown): string;
} = serialize;
