import type {SetReturnType as SetReturnTypeBase} from 'type-fest';

/**
 * A function type with the same parameters and another return type.
 * Handy to type a wrapper that returns something else, like `undefined`
 * instead of throwing.
 * @example
 * type Parse = (text: string, strict: boolean) => Data;
 * type ParseSafe = SetReturnType<Parse, Data | undefined>;
 * //=> (text: string, strict: boolean) => Data | undefined
 */
export type SetReturnType<
  // eslint-disable-next-line ts/no-explicit-any -- the same constraint as the type it is built on
  FunctionType extends (...arguments_: any[]) => any,
  TypeToReturn,
> = SetReturnTypeBase<FunctionType, TypeToReturn>;
