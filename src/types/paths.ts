import type {Paths as PathsBase} from 'type-fest';

/** Options of `Paths` */
export interface PathsOptions {
  /**
   * The maximum depth to look for paths at, from `0` to `10`.
   * Defaults to `5`
   */
  maxRecursionDepth?: number;

  /**
   * Writes array indexes and number keys in brackets, like `'items[0]'`,
   * instead of with dots, like `'items.0'`.
   * Defaults to `false`
   */
  bracketNotation?: boolean;

  /**
   * Only gives the paths of the leaves, not the paths of the objects and
   * arrays on the way.
   * Defaults to `false`
   */
  leavesOnly?: boolean;

  /**
   * Only gives the paths at this depth, `0` being the top-level keys.
   * By default, the paths at all depths up to `maxRecursionDepth` are given
   */
  depth?: number;
}

/**
 * The union of the deep paths to the properties of an object type, like
 * `'a' | 'a.b' | 'a.b.0'`, including the indexes of arrays.
 * Handy to type a path parameter, like the one of `getByPath`.
 * @example
 * type Project = {
 *   name: string;
 *   tags: string[];
 *   folder: {files: [{path: string}]};
 * };
 * type A = Paths<Project>;
 * //=> 'name' | 'tags' | `tags.${number}` | 'folder' | 'folder.files' | 'folder.files.0'
 * //   | 'folder.files.0.path'
 * @example
 * type B = Paths<Project, {leavesOnly: true}>;
 * //=> 'name' | `tags.${number}` | 'folder.files.0.path'
 * type C = Paths<{items: ['a']}, {bracketNotation: true}>;
 * //=> 'items' | 'items[0]'
 */
// eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
export type Paths<T, Options extends PathsOptions = {}> = PathsBase<T, Options>;
