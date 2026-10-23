import type {ElementFromSelector} from './element-from-selector.ts';

/**
 * Walks up from an element through its ancestors (starting with the element itself)
 * and returns the first one matching a CSS selector, typed from that selector:
 * `'form#login'` returns `HTMLFormElement | null` rather than `Element | null`.
 *
 * At runtime this is exactly `element.closest(selector)`: all of the added value is
 * in the types.
 * A malformed selector still throws, as it does natively.
 *
 * The selector must be a string *literal*: inference reads the literal type, so a
 * dynamically built (widened `string`) selector falls back to `Element`.
 * An unknown tag (a custom element) also falls back to `Element`; use
 * `closestTyped.as<T>(element, selector)` to state the type yourself, or augment
 * `HTMLElementTagNameMap` if the same element is queried across the project.
 * @param element - The element to start from.
 * It is itself a candidate for the match.
 * @param selector - The CSS selector to match.
 * A literal type yields a precise result.
 * @returns The nearest matching ancestor (or the element itself), typed from the selector, or
 * `null` if none matches.
 * @example
 * const form = closestTyped(input, 'form#login');
 * // HTMLFormElement | null
 * @example
 * // The element itself matches first
 * const row = closestTyped(cell, 'td, th');
 * // HTMLTableCellElement | null
 * @example
 * // Escape hatch for custom elements
 * const widget = closestTyped.as<MyWidget>(button, 'my-widget');
 * // MyWidget | null
 */
export const closestTyped = Object.assign(
  <Selector extends string>(element: Element, selector: Selector) =>
    element.closest<ElementFromSelector<Selector>>(selector),
  {
    // eslint-disable-next-line ts/no-unnecessary-type-parameters -- appearing only in the return type is the point: the caller states the type an inference cannot reach
    as: <TargetElement extends Element>(element: Element, selector: string) =>
      element.closest<TargetElement>(selector),
  },
);
