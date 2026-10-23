import type {RequireAllOrNone as RequireAllOrNoneBase} from 'type-fest';

/**
 * Requires either all or none of the given keys of an object type, keeping the
 * other keys as they are.
 * Handy for options that only make sense together.
 * Keys that the type does not declare are not checked.
 * @example
 * type Options = {width?: number; height?: number; title: string};
 * type SizedOptions = RequireAllOrNone<Options, 'width' | 'height'>;
 * const a: SizedOptions = {title: 'a'};
 * const b: SizedOptions = {title: 'b', width: 1, height: 2};
 * // @ts-expect-error: `height` is missing
 * const c: SizedOptions = {title: 'c', width: 1};
 */
export type RequireAllOrNone<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType,
> = RequireAllOrNoneBase<ObjectType, KeysType>;
