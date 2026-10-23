import type {PickIndexSignature as PickIndexSignatureBase} from 'type-fest';

/**
 * Keeps only the index signatures, like `[key: string]: unknown`, of an object
 * type, removing the properties that are declared by name.
 * To remove the index signatures instead, use `OmitIndexSignature`.
 * @example
 * type Example = {
 *   [key: string]: unknown;
 *   [key: `data-${string}`]: string;
 *   foo: 'bar';
 * };
 * type A = PickIndexSignature<Example>;
 * //=> {[key: string]: unknown; [key: `data-${string}`]: string}
 */
export type PickIndexSignature<ObjectType> = PickIndexSignatureBase<ObjectType>;
