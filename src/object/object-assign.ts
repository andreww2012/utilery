import {objectAssign as objectAssignBase} from 'ts-extras';

/**
 * A strongly-typed `Object.assign`: copies the own enumerable properties of each
 * `source` onto `target`, **mutating** and returning `target`.
 * Later sources override earlier ones at runtime.
 *
 * Unlike the native `Object.assign`, whose return type is the unsound
 * intersection `Target & Source` (where conflicting keys collapse to `never`),
 * the result is a conservative merge: keys present only on a source become
 * optional, and keys shared with the target widen to the union of both value
 * types.
 *
 * For a non-mutating merge into a fresh object, use `mergeObjects`.
 * @param target - The object to mutate and receive the copied properties.
 * @param sources - Objects whose own enumerable properties are copied onto `target`, applied left
 * to right.
 * @returns The mutated `target`, typed as the conservative merge.
 * @example
 * // Source-only keys become optional
 * objectAssign({a: 1}, {b: 2});
 * // {a: number; b?: number}
 * @example
 * // Overlapping keys widen to a union instead of collapsing to `never`
 * objectAssign({a: 1}, {a: 'x'});
 * // {a: number | string}
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const objectAssign = objectAssignBase;
