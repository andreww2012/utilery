import type {ValueOf} from 'type-fest';

/**
 * The union of the value types of an object type, or of the given keys only.
 * @example
 * type User = {id: number; name: string; isActive: boolean};
 * type A = ObjectValues<User>;
 * //=> number | string | boolean
 * type B = ObjectValues<User, 'id' | 'name'>;
 * //=> number | string
 */
export type ObjectValues<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ValueOf<ObjectType, ValueType>;
