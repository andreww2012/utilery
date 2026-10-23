import {objectUpdate as objectUpdateBase} from 'ts-extras';

/**
 * Applies a type-checked partial update to `target` in place, **mutating** and
 * returning it.
 * The `source` is constrained to the target's existing writable keys, so the
 * compiler rejects unknown keys, mismatched value types, and `readonly` keys,
 * even when `source` is a pre-typed variable rather than an object literal.
 *
 * Unlike `objectAssign`, this never adds keys or changes their types; it only
 * overwrites existing writable ones, which is what makes it safe for partial
 * updates.
 * Union-typed targets are unsupported (narrow to a single variant first), and
 * `source` must expose at least one known key.
 * @param target - The object to update in place.
 * @param source - A partial of `target` covering only its existing writable keys.
 * @returns The mutated `target`.
 * @example
 * const user = {name: 'Ada', age: 41};
 * objectUpdate(user, {age: 42});
 * // user is now {name: 'Ada', age: 42}
 * @example
 * // Rejected at compile time
 * objectUpdate(user, {email: 'ada@example.com'}); // unknown key
 * objectUpdate(user, {age: '42'}); // wrong value type
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const objectUpdate = objectUpdateBase;
