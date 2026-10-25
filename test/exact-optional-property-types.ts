import type {IsExactOptionalPropertyTypes} from '../src/_internal/types.ts';

/**
 * `undefined`, which an optional property or element may hold, or `never` with the
 * `exactOptionalPropertyTypes` compiler option, which doesn't allow that
 */
export type OptionalUndefined = IsExactOptionalPropertyTypes extends true ? never : undefined;

/**
 * An explicit `undefined` for an optional property, typed so that even the
 * `exactOptionalPropertyTypes` compiler option allows it: users without the
 * option may set any optional property to `undefined`
 */
// eslint-disable-next-line ts/no-unnecessary-type-assertion -- it's `never` with the option
export const EXPLICIT_UNDEFINED = undefined as OptionalUndefined;
