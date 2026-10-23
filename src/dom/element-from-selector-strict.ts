import type {StrictlyParseSelector} from 'typed-query-selector/parser';

/**
 * Like `ElementFromSelector`, but additionally validates the selector's syntax:
 * a malformed selector resolves to `never` instead of falling back to `Fallback`.
 *
 * This turns a typo into a compile error at the point of use, which mirrors the
 * runtime behavior: a malformed selector makes `querySelector` throw rather than
 * return `null`.
 *
 * A widened `string` still resolves to `Fallback`, since there is no literal to check.
 *
 * The check covers the tag names it extracts and the overall shape of the selector:
 * dangling combinators, stray punctuation, and identifiers that cannot start a tag name.
 * It is deliberately not spec-complete, because a full CSS parser would cost too much
 * type-checking time: an unterminated attribute bracket, for one, is not caught.
 * @example
 * type App = ElementFromSelectorStrict<'div#app'>; // HTMLDivElement
 * @example
 * // A dangling combinator: a typo that would throw at runtime
 * type Broken = ElementFromSelectorStrict<'div#app >'>; // never
 * @example
 * // An identifier that cannot be a tag name
 * type AlsoBroken = ElementFromSelectorStrict<'123bad'>; // never
 * @example
 * // Unknown tags still fall back rather than failing
 * type Widget = ElementFromSelectorStrict<'my-widget', HTMLElement>; // HTMLElement
 */
export type ElementFromSelectorStrict<
  Selector extends string,
  Fallback extends Element = Element,
> = StrictlyParseSelector<Selector, Fallback>;
