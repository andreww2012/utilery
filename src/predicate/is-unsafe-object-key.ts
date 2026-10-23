const UNSAFE_OBJECT_KEYS: ReadonlySet<PropertyKey> = new Set([
  '__proto__',
  'constructor',
  'prototype',
]);

/**
 * Checks whether a key could be used for prototype pollution when an object is
 * built or updated from untrusted data: `'__proto__'`, `'constructor'` or
 * `'prototype'`.
 * Writing such a key, like `target[key] = value` with key `'__proto__'`, can
 * change the prototype of all objects.
 * @param key - The key to check.
 * @returns `true` if the key is unsafe to write, otherwise `false`.
 * @example
 * isUnsafeObjectKey('__proto__');
 * // true
 * isUnsafeObjectKey('name');
 * // false
 * @example
 * // Copy untrusted data safely
 * for (const [key, value] of Object.entries(JSON.parse(body))) {
 *   if (!isUnsafeObjectKey(key)) {
 *     target[key] = value;
 *   }
 * }
 */
export const isUnsafeObjectKey = (
  key: PropertyKey,
): key is '__proto__' | 'constructor' | 'prototype' => UNSAFE_OBJECT_KEYS.has(key);
