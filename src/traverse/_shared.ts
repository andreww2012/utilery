/* eslint-disable ts/no-explicit-any -- mirrors the types the traversal is implemented with, which type nodes as `any` */

/** Options of the traverse functions */
export interface TraverseOptions {
  /**
   * Works on a copy of the value, so that updates and removals done through
   * the context leave the original untouched.
   * Defaults to `false`
   */
  immutable?: boolean;

  /**
   * Also visits the properties with symbol keys.
   * Defaults to `false`
   */
  includeSymbols?: boolean;

  /**
   * The maximum depth to visit: deeper nesting throws a `RangeError` instead of
   * overflowing the call stack, which protects against untrusted input.
   * Unlimited by default
   */
  maxDepth?: number;

  /** Not used by the traverse functions, which are synchronous */
  signal?: AbortSignal;

  /**
   * Visits the entries of maps (each value under its key) and sets (each value
   * under its index) instead of treating them as leaves.
   * Defaults to `false`
   */
  descendIntoMapSet?: boolean;

  /** Not used by the traverse functions, which are synchronous */
  concurrency?: number;
}

/** The context the traverse functions pass to their callbacks for each visited node */
export interface TraverseContext {
  /** The visited node */
  node: any;

  /** The keys from the root to the node: empty for the root */
  path: PropertyKey[];

  /** The context of the parent node, or `undefined` for the root */
  parent: TraverseContext | undefined;

  /** The contexts of the ancestors of the node, from the root */
  parents: TraverseContext[];

  /** The key of the node in its parent, or `undefined` for the root */
  key: PropertyKey | undefined;

  /** Whether the node is the root */
  isRoot: boolean;

  /** Whether the node is not the root */
  notRoot: boolean;

  /**
   * Whether the node is the last child of its parent.
   * It is only set once the node is visited, so read it in a `post` callback of
   * the parent
   */
  isLast: boolean;

  /**
   * Whether the node is the first child of its parent.
   * It is only set once the node is visited, so read it in a `post` callback of
   * the parent
   */
  isFirst: boolean;

  /** Whether the node has no children to visit, like a primitive or an empty object */
  isLeaf: boolean;

  /** Whether the node has children to visit */
  notLeaf: boolean;

  /** The depth of the node: `0` for the root */
  level: number;

  /**
   * The context of the ancestor the node is the same object as, which means a
   * circular reference, or `undefined`.
   * The children of such a node are not visited
   */
  circular: TraverseContext | undefined;

  /**
   * Replaces the node with `value`, whose children are then visited, unless
   * `shouldStop` is `true`
   */
  update: (value: any, shouldStop?: boolean) => void;

  /**
   * Removes the node from its parent: an array item is spliced out, and an
   * object property is deleted.
   * The children of the node are not visited
   */
  remove: (shouldStop?: boolean) => void;

  /**
   * Deletes the node from its parent with `delete`, so an array item leaves a
   * hole.
   * The children of the node are not visited
   */
  delete: (shouldStop?: boolean) => void;

  /**
   * The keys of the children to visit, or `null` for a leaf.
   * Assign it in a `before` callback to visit the children in another order
   */
  keys: PropertyKey[] | null;

  /** Registers a callback to call before the children of the node are visited */
  before: (callback: (context: TraverseContext, value: any) => void) => void;

  /** Registers a callback to call after the children of the node are visited */
  after: (callback: (context: TraverseContext, value: any) => void) => void;

  /** Registers a callback to call before each child of the node is visited */
  pre: (callback: (context: TraverseContext, child: any, key: any) => void) => void;

  /** Registers a callback to call after each child of the node is visited */
  post: (callback: (context: TraverseContext, child: any) => void) => void;

  /** Stops the whole traversal */
  stop: () => void;

  /** Skips the children of the node */
  block: () => void;

  /** Returns the context of the next sibling of the node, or `undefined` */
  nextSibling: () => TraverseContext | undefined;

  /** Returns the context of the previous sibling of the node, or `undefined` */
  prevSibling: () => TraverseContext | undefined;
}
