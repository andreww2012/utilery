import type {If as IfBase} from 'type-fest';

/**
 * `IfBranch` when `Type` is `true`, and `ElseBranch` when it is `false`.
 * `boolean` and `any` give the union of both branches, and `never` gives
 * `ElseBranch`.
 * Handy with the `Is*` types.
 * In a recursive type, prefer a plain conditional type: `If` can prevent the
 * tail-call optimization of TypeScript and make long inputs fail.
 * @example
 * type A = If<true, 'yes', 'no'>;
 * //=> 'yes'
 * type B = If<boolean, 'yes', 'no'>;
 * //=> 'yes' | 'no'
 * type C = If<IsNever<never>, 'is never', 'not never'>;
 * //=> 'is never'
 */
export type If<Type extends boolean, IfBranch, ElseBranch> = IfBase<Type, IfBranch, ElseBranch>;
