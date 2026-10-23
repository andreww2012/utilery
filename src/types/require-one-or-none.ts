import type {RequireOneOrNone as RequireOneOrNoneBase} from 'type-fest';

/**
 * Allows at most one of the given keys of an object type (all of them by
 * default), keeping the other keys as they are.
 * For exactly one, use `RequireExactlyOne`.
 * @example
 * type Response = {text: () => string; json: () => unknown; status: number};
 * type Responder = RequireOneOrNone<Response, 'text' | 'json'>;
 * const a: Responder = {status: 204};
 * const b: Responder = {status: 200, text: () => 'hi'};
 * // @ts-expect-error: both `text` and `json`
 * const c: Responder = {status: 200, text: () => '', json: () => ({})};
 */
export type RequireOneOrNone<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = RequireOneOrNoneBase<ObjectType, KeysType>;
