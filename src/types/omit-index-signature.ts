import type {OmitIndexSignature as OmitIndexSignatureBase} from 'type-fest';

/**
 * Removes the index signatures, like `[key: string]: unknown`, from an object
 * type, keeping the properties that are declared by name.
 * Handy to get rid of an overly broad signature from a type you don't
 * control.
 * To keep only the index signatures, use `PickIndexSignature`.
 * @example
 * type Example = {
 *   [key: string]: unknown;
 *   [key: `data-${string}`]: string;
 *   foo: 'bar';
 *   qux?: 'baz';
 * };
 * type A = OmitIndexSignature<Example>;
 * //=> {foo: 'bar'; qux?: 'baz'}
 */
export type OmitIndexSignature<ObjectType> = OmitIndexSignatureBase<ObjectType>;
