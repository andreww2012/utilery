import type {TagNameToElement} from 'typed-query-selector/parser';

/**
 * Resolves a bare tag name to its element type, looking it up in
 * `HTMLElementTagNameMap` and then `SVGElementTagNameMap`.
 *
 * Unlike `ElementFromSelector`, this accepts a tag name only (no classes, ids,
 * attributes or combinators), which makes it the cheaper choice when that is all
 * you have.
 * A tag name absent from both maps resolves to `Fallback`.
 * @example
 * type Canvas = ElementFromTagName<'canvas'>; // HTMLCanvasElement
 * @example
 * type Circle = ElementFromTagName<'circle'>; // SVGCircleElement
 * @example
 * type Widget = ElementFromTagName<'my-widget', HTMLElement>; // HTMLElement
 */
export type ElementFromTagName<
  TagName extends string,
  Fallback extends Element = Element,
> = TagNameToElement<TagName, Fallback>;
