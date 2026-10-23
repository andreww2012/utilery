import type {RequireExactlyOne as RequireExactlyOneBase} from 'type-fest';

/**
 * Requires exactly one of the given keys of an object type (all of them by
 * default) and rejects the others, keeping the other keys as they are.
 * Keys that the type does not declare are not checked.
 * For one or none, use `RequireOneOrNone`.
 * @example
 * type Response = {text: () => string; json: () => unknown; status: number};
 * type Responder = RequireExactlyOne<Response, 'text' | 'json'>;
 * const a: Responder = {status: 200, json: () => ({})};
 * // @ts-expect-error: both `text` and `json`
 * const b: Responder = {status: 200, text: () => '', json: () => ({})};
 */
export type RequireExactlyOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = RequireExactlyOneBase<ObjectType, KeysType>;
