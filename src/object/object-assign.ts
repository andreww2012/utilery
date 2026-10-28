import type {objectAssign as objectAssignBase} from 'ts-extras';
import {assignOwnProperties} from '../_internal/assign-own-properties.ts';

/**
 * A strongly-typed `Object.assign`: copies the own enumerable properties of each `source` onto
 * `target`, **mutating** and returning `target`
 */
export const objectAssign: {
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
   * Unlike `Object.assign`, an own `__proto__` key of a source (which `JSON.parse`
   * can create) becomes an own property of `target` instead of replacing its
   * prototype.
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
  <Target extends object, Sources extends readonly unknown[]>(
    target: Parameters<typeof objectAssignBase<Target, Sources>>[0],
    ...sources: Sources
  ): ReturnType<typeof objectAssignBase<Target, Sources>>;
} = (target: object, ...sources: readonly unknown[]) =>
  // The runtime can't prove the merged type, just like for `Object.assign`
  assignOwnProperties(target, sources) as never;
