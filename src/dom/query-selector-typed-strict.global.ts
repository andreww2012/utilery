import type {ElementFromSelectorStrict} from './element-from-selector-strict.ts';

/* Strict counterpart of `./query-selector-typed.global.ts`: same global augmentation, except a
 * malformed selector resolves to `never` instead of falling back to `Element`, so a typo
 * fails to compile rather than surfacing as a runtime throw.
 *
 * Mutually exclusive with `utilery/dom/query-selector-typed.global`: both augment the same
 * members, so importing both merges two conflicting sets of overloads */
declare global {
  interface ParentNode {
    querySelector<Selector extends string, Matched extends ElementFromSelectorStrict<Selector>>(
      selector: Selector,
    ): [Matched] extends [never] ? never : Matched | null;

    querySelectorAll<Selector extends string, Matched extends ElementFromSelectorStrict<Selector>>(
      selector: Selector,
    ): [Matched] extends [never] ? never : NodeListOf<Matched>;
  }

  interface Element {
    closest<Selector extends string, Matched extends ElementFromSelectorStrict<Selector>>(
      selector: Selector,
    ): [Matched] extends [never] ? never : Matched | null;
  }
}
