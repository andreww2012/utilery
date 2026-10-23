import type {OverrideProperties as OverridePropertiesBase} from 'type-fest';

/**
 * Replaces the types of properties of an object type, like `MergeTypes`, but
 * only accepts properties that exist in the original type, so that a typo is a
 * compile error.
 * @example
 * type User = {id: string; name: string};
 * type A = OverrideProperties<User, {id: number}>;
 * //=> {id: number; name: string}
 * // @ts-expect-error: `age` is not a property of `User`
 * type B = OverrideProperties<User, {age: number}>;
 */
export type OverrideProperties<
  TOriginal,
  TOverride extends Partial<Record<keyof TOriginal, unknown>> & {
    [Key in keyof TOverride]: Key extends keyof TOriginal ? TOverride[Key] : never;
  },
> = OverridePropertiesBase<TOriginal, TOverride>;
