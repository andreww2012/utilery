import type {SetRequired as SetRequiredBase} from 'type-fest';

/**
 * Makes the given properties of an object type, or elements of a tuple type,
 * required, keeping the others as they are.
 * To make properties optional, use `SetOptional`.
 * For deep paths, use `SetRequiredDeep`.
 * @example
 * type Foo = {a?: number; b?: string; c: boolean};
 * type A = SetRequired<Foo, 'b'>;
 * //=> {a?: number; b: string; c: boolean}
 * type B = SetRequired<[number?, number?, number?], 0 | 1>;
 * //=> [number, number, number?]
 */
export type SetRequired<BaseType, Keys extends keyof BaseType> = SetRequiredBase<BaseType, Keys>;
