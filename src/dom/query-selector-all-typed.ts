import type {ElementFromSelector} from './element-from-selector.ts';

/** Finds every element matching a CSS selector, typed from the selector itself, as an array */
export const querySelectorAllTyped: {
  /**
   * Finds every element matching a CSS selector, typed from the selector itself, and
   * returns them as a real array: `'span.badge'` yields `HTMLSpanElement[]`.
   *
   * Returning an array rather than the native `NodeList` is the point: `map`, `filter`,
   * `find`, `flatMap` and every array utility become available without spreading first.
   * Nothing is lost by the conversion, because the underlying collection is static
   * (it does not update as the document changes).
   *
   * The selector must be a string *literal*: inference reads the literal type, so a
   * dynamically built (widened `string`) selector falls back to `Element`.
   * An unknown tag (a custom element) also falls back to `Element`; use
   * `querySelectorAllTyped.as<T>(selector, root?)` to state the type yourself, or augment
   * `HTMLElementTagNameMap` if the same element is queried across the project.
   * A malformed selector throws, as it does natively.
   * @param selector - The CSS selector to match.
   * A literal type yields a precise result.
   * @param root - Where to search.
   * Defaults to `document`.
   * @returns An array of matching elements, typed from the selector.
   * Empty when nothing matches.
   * @example
   * const badges = querySelectorAllTyped('span.badge');
   * // HTMLSpanElement[]
   * @example
   * // Composes directly with array methods
   * const labels = querySelectorAllTyped('option', select)
   *   .filter((option) => !option.disabled)
   *   .map((option) => option.label);
   * @example
   * // Escape hatch for custom elements
   * const widgets = querySelectorAllTyped.as<MyWidget>('my-widget');
   * // MyWidget[]
   */
  <Selector extends string>(selector: Selector, root?: ParentNode): ElementFromSelector<Selector>[];
  /** Like `querySelectorAllTyped`, but typed as the element type you state */
  as: {
    /**
     * Like `querySelectorAllTyped`, but typed as the element type you state, for selectors it
     * cannot infer, like a custom element.
     * At runtime this is exactly `[...root.querySelectorAll(selector)]`.
     * A malformed selector throws, as it does natively.
     * @param selector - The CSS selector to match.
     * @param root - Where to search.
     * Defaults to `document`.
     * @returns An array of matching elements, typed as `TargetElement`.
     * Empty when nothing matches.
     * @example
     * const widgets = querySelectorAllTyped.as<MyWidget>('my-widget');
     * // MyWidget[]
     */
    <TargetElement extends Element>(selector: string, root?: ParentNode): TargetElement[];
  };
} = Object.assign(
  <Selector extends string>(selector: Selector, root: ParentNode = document) => [
    ...root.querySelectorAll<ElementFromSelector<Selector>>(selector),
  ],
  {
    as: <TargetElement extends Element>(selector: string, root: ParentNode = document) => [
      ...root.querySelectorAll<TargetElement>(selector),
    ],
  },
);
