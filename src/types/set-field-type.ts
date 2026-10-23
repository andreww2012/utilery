import type {SetFieldType as SetFieldTypeBase} from 'type-fest';

/** Options of `SetFieldType` */
export interface SetFieldTypeOptions {
  /**
   * Keeps the optional and `readonly` modifiers of the changed properties.
   * The other properties always keep theirs.
   * Defaults to `true`
   */
  preservePropertyModifiers?: boolean;
}

/**
 * Changes the type of the given properties of an object type to `NewType`.
 * Handy for variants of a model, like one sent as JSON where dates are
 * strings.
 * To change properties to different types, use `MergeTypes`.
 * @example
 * type Model = {readonly id: number; readonly createdAt: Date; updatedAt?: Date};
 * type A = SetFieldType<Model, 'createdAt' | 'updatedAt', string>;
 * //=> {readonly id: number; readonly createdAt: string; updatedAt?: string}
 * type B = SetFieldType<Model, 'createdAt', string, {preservePropertyModifiers: false}>;
 * //=> {readonly id: number; createdAt: string; updatedAt?: Date}
 */
export type SetFieldType<
  BaseType,
  Keys extends keyof BaseType,
  NewType,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends SetFieldTypeOptions = {},
> = SetFieldTypeBase<BaseType, Keys, NewType, Options>;
