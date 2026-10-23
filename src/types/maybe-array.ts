import type {Arrayable} from 'type-fest';

/**
 * A value or an array of values.
 * For a parameter, prefer `MaybeReadonlyArray`, which also accepts readonly
 * arrays.
 * To turn such a value into an array, use `arrayify`.
 * @example
 * const bundle = (input: string, output: MaybeArray<string>) => {
 *   const outputs = arrayify(output);
 * };
 * bundle('src/index.ts', 'dist/index.js');
 * bundle('src/index.ts', ['dist/index.cjs', 'dist/index.mjs']);
 */
export type MaybeArray<T> = Arrayable<T>;
