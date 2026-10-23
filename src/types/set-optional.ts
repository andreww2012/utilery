import type {SetOptional as SetOptionalBase} from 'type-fest';

/**
 * Makes the given properties of an object type optional, keeping the other
 * properties as they are.
 * To make properties required, use `SetRequired`.
 * @example
 * type User = {id: number; name: string; email: string};
 * type NewUser = SetOptional<User, 'id' | 'email'>;
 * //=> {id?: number; name: string; email?: string}
 */
export type SetOptional<BaseType, Keys extends keyof BaseType> = SetOptionalBase<BaseType, Keys>;
