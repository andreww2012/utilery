import type {Tagged, Writable} from 'type-fest';

/** Union of every value that appears more than once in `Members` */
type Duplicates<Members extends readonly unknown[], Seen = never> = Members extends readonly [
  infer First,
  ...infer Rest,
]
  ? (First extends Seen ? First : never) | Duplicates<Rest, Seen | First>
  : never;

/**
 * An unsatisfiable error-branch value: it brands `Reason` with a module-private
 * `unique symbol`, so a caller cannot hand-craft a value of this type to slip
 * past the check (short of an explicit cast, which defeats any type anyway).
 * `Reason` carries the offending members so they still show up in the error
 * message
 */
type Invalid<Reason> = Tagged<Reason, 'Invalid'>;

/**
 * One or more single-property objects whose *keys spell out what is wrong* with
 * `Candidate` and whose values name the offending members, or `unknown` when
 * `Candidate` lists every member of `Union` exactly once.
 * A tuple can never have those keys, so intersecting it with these objects makes
 * the call fail to type-check with a human-readable message naming the missing,
 * extra or duplicated members; the values are {@link Invalid}-branded so the
 * shape cannot be forged by hand
 */
type ValidationErrors<Union, Candidate extends readonly unknown[]> = ([
  Exclude<Candidate[number], Union>,
] extends [never]
  ? unknown
  : {
      'This array has values that are not members of the union': Invalid<
        Exclude<Candidate[number], Union>
      >;
    }) &
  ([Exclude<Union, Candidate[number]>] extends [never]
    ? unknown
    : {'This array is missing these union members': Invalid<Exclude<Union, Candidate[number]>>}) &
  ([Duplicates<Candidate>] extends [never]
    ? unknown
    : {'This array has these duplicate members': Invalid<Duplicates<Candidate>>});

/**
 * The parameter type of {@link allUnionMembers}: the validation problems (see
 * {@link ValidationErrors}) intersected with `Candidate` itself, so it resolves
 * to `Candidate` when valid and is unsatisfiable otherwise.
 * The errors come first in the intersection so that, when the check fails,
 * TypeScript prints the descriptive object before the (noisier) tuple in its
 * error message
 */
export type AllUnionMembers<Union, Candidate extends readonly unknown[]> = ValidationErrors<
  Union,
  Candidate
> &
  Candidate;

/**
 * Builds a compile-time guard that a tuple lists every member of `Union`
 * exactly once: no missing members, no extras and no duplicates.
 * It is meant to keep a runtime list in sync with a union type: whenever the
 * union changes, the tuple stops type-checking until it is updated to match.
 *
 * Because TypeScript cannot infer one type argument while another is given
 * explicitly, the union is passed to the outer call and the tuple is inferred
 * by the returned function.
 * At runtime the returned function is the identity function: all of the work
 * happens in the type system.
 * An invalid tuple fails to type-check with a message that names the missing,
 * extra or duplicated members (see {@link AllUnionMembers}).
 *
 * By default the result is widened to a mutable tuple; pass `{readonly: true}`
 * as the second type argument to preserve the `readonly` tuple type instead.
 * @returns A function that accepts the tuple and returns it unchanged, typed as
 * the tuple of `Union`'s members (mutable by default, `readonly` on request).
 * @example
 * type Fruit = 'apple' | 'banana' | 'cherry';
 *
 * // OK: lists every member exactly once
 * const fruits = allUnionMembers<Fruit>()(['apple', 'banana', 'cherry']);
 * // type: ['apple', 'banana', 'cherry']
 * @example
 * // Error: "...is missing these union members": "cherry"
 * allUnionMembers<Fruit>()(['apple', 'banana']);
 * @example
 * // Error: 'apple' is duplicated
 * allUnionMembers<Fruit>()(['apple', 'banana', 'cherry', 'apple']);
 * @example
 * // Error: 'date' is not a member of `Fruit`
 * allUnionMembers<Fruit>()(['apple', 'banana', 'cherry', 'date']);
 * @example
 * // Keep the tuple `readonly`
 * const readonlyFruits = allUnionMembers<Fruit, {readonly: true}>()([
 *   'apple',
 *   'banana',
 *   'cherry',
 * ]);
 * // type: readonly ['apple', 'banana', 'cherry']
 */
export const allUnionMembers =
  <
    Union,
    // eslint-disable-next-line ts/no-unnecessary-type-parameters
    Options extends {readonly?: boolean} = {readonly: false},
  >() =>
  // The parameter is written as the raw intersection rather than the
  // `AllUnionMembers` alias so TypeScript expands it inline and leads the error
  // with the descriptive object instead of an opaque `AllUnionMembers<...>`
  <const Candidate extends readonly unknown[]>(
    members: ValidationErrors<Union, Candidate> & Candidate,
  ) =>
    members as Options['readonly'] extends true ? Candidate : Writable<Candidate>;
