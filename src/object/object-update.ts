import {assignOwnProperties} from '../_internal/assign-own-properties.ts';
import type {PropertyValue} from '../_internal/types.ts';
import type {ExactShape} from '../types/exact-shape.ts';
import type {IsUnion} from '../types/is-union.ts';
import type {WritableKeysOf} from '../types/writable-keys-of.ts';

// The keys that `source` may set to `undefined` while `target` does not allow it
type UnsafeUndefinedKeys<Target extends object, Source extends object> = {
  [Key in keyof Source]-?: Key extends WritableKeysOf<Target>
    ? undefined extends PropertyValue<Source, Key>
      ? undefined extends PropertyValue<Target, Key>
        ? never
        : Key
      : never
    : never;
}[keyof Source];

type UpdatableShape<Target extends object, Source extends object> =
  IsUnion<Target> extends true
    ? never
    : {[Key in keyof Source]: Key extends WritableKeysOf<Target> ? Target[Key] : never} & Record<
        UnsafeUndefinedKeys<Target, Source>,
        never
      >;

type KnownKeySource<Source extends object> = keyof Source extends never ? never : Source;

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
 * Unlike `Object.assign`, an own `__proto__` key of `source` (which `JSON.parse`
 * can create) becomes an own property of `target` instead of replacing its
 * prototype.
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
export const objectUpdate = <Target extends object, Source extends object>(
  target: Target,
  source: KnownKeySource<Source> & ExactShape<UpdatableShape<Target, Source>, Source>,
): Target => assignOwnProperties(target, [source]);
