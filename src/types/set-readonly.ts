import type {SetReadonly as SetReadonlyBase} from 'type-fest';

/**
 * Makes the given properties of an object type `readonly`, keeping the other
 * properties as they are.
 * @example
 * type User = {id: number; name: string};
 * type A = SetReadonly<User, 'id'>;
 * //=> {readonly id: number; name: string}
 */
export type SetReadonly<BaseType, Keys extends keyof BaseType> = SetReadonlyBase<BaseType, Keys>;
