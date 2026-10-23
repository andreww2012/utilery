import type {UnionMember as UnionMemberBase} from 'type-fest';

/**
 * One member of a union type, which one is not specified, or `never` for
 * `never`.
 * Handy in recursive types that go through a union member by member.
 * @example
 * type A = UnionMember<'a' | 'b'>;
 * //=> 'a' or 'b'
 * @example
 * type CountMembers<T, Counter extends unknown[] = []> = [T] extends [never]
 *   ? Counter['length']
 *   : CountMembers<Exclude<T, UnionMember<T>>, [...Counter, unknown]>;
 * type B = CountMembers<1 | 2 | 3>;
 * //=> 3
 */
export type UnionMember<T> = UnionMemberBase<T>;
