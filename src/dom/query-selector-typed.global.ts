import type {ElementFromSelector} from './element-from-selector.ts';

/* Side-effect-only module: importing it augments the DOM lookup methods globally so
 * that *every* call site infers its element type from the selector, with no wrappers
 * and no call-site changes. Deliberately not re-exported from the group barrel, as that
 * would force the augmentation on everyone importing `unutils/dom`.
 *
 * Mutually exclusive with `unutils/dom/query-selector-typed-strict.global`: both augment the
 * same members, so importing both merges two conflicting sets of overloads */
declare global {
  interface ParentNode {
    querySelector<Selector extends string>(
      selector: Selector,
    ): ElementFromSelector<Selector> | null;

    querySelectorAll<Selector extends string>(
      selector: Selector,
    ): NodeListOf<ElementFromSelector<Selector>>;
  }

  interface Element {
    closest<Selector extends string>(selector: Selector): ElementFromSelector<Selector> | null;
  }
}
