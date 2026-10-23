import type {LiteralToPrimitiveDeep as LiteralToPrimitiveDeepBase} from 'type-fest';

/**
 * Widens every literal type in an object or array type to its primitive type
 * (see `LiteralToPrimitive`), at any depth.
 * Handy to accept new values for an object declared `as const`, like a
 * default config.
 * @example
 * const defaults = {name: 'app', retries: 3, debug: false} as const;
 * type Config = LiteralToPrimitiveDeep<typeof defaults>;
 * //=> {readonly name: string; readonly retries: number; readonly debug: boolean}
 */
export type LiteralToPrimitiveDeep<T> = LiteralToPrimitiveDeepBase<T>;
