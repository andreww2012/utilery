import type {ElementFromSelector} from './element-from-selector.ts';

/** Finds the first element matching a CSS selector, typed from the selector itself */
export const querySelectorTyped: {
  /**
   * Finds the first element matching a CSS selector, typed from the selector itself:
   * `'button#submit'` returns `HTMLButtonElement | null` rather than `Element | null`,
   * so no cast or type argument is needed at the call site.
   *
   * At runtime this is exactly `root.querySelector(selector)`: all of the added value
   * is in the types.
   * A malformed selector still throws, as it does natively.
   *
   * The selector must be a string *literal*: inference reads the literal type, so a
   * dynamically built (widened `string`) selector falls back to `Element`.
   * An unknown tag (a custom element) also falls back to `Element`; use
   * `querySelectorTyped.as<T>(selector, root?)` to state the type yourself, or augment
   * `HTMLElementTagNameMap` if the same element is queried across the project.
   * @param selector - The CSS selector to match.
   * A literal type yields a precise result.
   * @param root - Where to search.
   * Defaults to `document`.
   * @returns The first matching element, typed from the selector, or `null` if nothing matches.
   * @example
   * const submit = querySelectorTyped('button#submit');
   * // HTMLButtonElement | null
   * @example
   * // Scoped to a subtree
   * const field = querySelectorTyped('input[name=email]', form);
   * // HTMLInputElement | null
   * @example
   * // Grouping produces a union
   * const heading = querySelectorTyped('h1, h2');
   * // HTMLHeadingElement | null
   * @example
   * // Escape hatch for custom elements
   * const widget = querySelectorTyped.as<MyWidget>('my-widget');
   * // MyWidget | null
   */
  <Selector extends string>(
    selector: Selector,
    root?: ParentNode,
  ): ElementFromSelector<Selector> | null;
  /** Like `querySelectorTyped`, but typed as the element type you state */
  as: {
    /**
     * Like `querySelectorTyped`, but typed as the element type you state, for selectors it
     * cannot infer, like a custom element.
     * At runtime this is exactly `root.querySelector(selector)`.
     * A malformed selector throws, as it does natively.
     * @param selector - The CSS selector to match.
     * @param root - Where to search.
     * Defaults to `document`.
     * @returns The first matching element, typed as `TargetElement`, or `null` if nothing matches.
     * @example
     * const widget = querySelectorTyped.as<MyWidget>('my-widget');
     * // MyWidget | null
     */
    // eslint-disable-next-line ts/no-unnecessary-type-parameters -- appearing only in the return type is the point: the caller states the type an inference cannot reach
    <TargetElement extends Element>(selector: string, root?: ParentNode): TargetElement | null;
  };
} = Object.assign(
  <Selector extends string>(selector: Selector, root: ParentNode = document) =>
    root.querySelector<ElementFromSelector<Selector>>(selector),
  {
    // eslint-disable-next-line ts/no-unnecessary-type-parameters -- appearing only in the return type is the point: the caller states the type an inference cannot reach
    as: <TargetElement extends Element>(selector: string, root: ParentNode = document) =>
      root.querySelector<TargetElement>(selector),
  },
);
