import type {SetParameterType as SetParameterTypeBase} from 'type-fest';

/**
 * A function type with some parameters replaced: pass a tuple to replace them
 * from the start, or an object with parameter indexes as keys to replace
 * specific ones.
 * The other parameters, and the return type, are kept as they are, even when
 * the return type depends on a replaced parameter.
 * Type parameters of a generic function are not kept.
 * @example
 * type Handler = (data: Data, message: string, ...rest: unknown[]) => void;
 * type A = SetParameterType<Handler, {1: 'ok'}>;
 * //=> (data: Data, message: 'ok', ...rest: unknown[]) => void
 * type B = SetParameterType<Handler, [data: ErrorData, message: 'error']>;
 * //=> (data: ErrorData, message: 'error', ...rest: unknown[]) => void
 */
export type SetParameterType<
  FunctionType extends (...arguments_: any[]) => unknown,
  P extends Record<number, unknown>,
> = SetParameterTypeBase<FunctionType, P>;
