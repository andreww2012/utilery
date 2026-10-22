import {hyperlink} from 'clickable-path';

export type {HyperlinkOptions as FormatTerminalLinkOptions} from 'clickable-path';

/**
 * Formats text as a clickable link for terminals (the OSC 8 escape sequence):
 * the label is shown, and clicking it opens the URL. The URL is used as is.
 *
 * When the terminal does not support links (see `isTerminalLinkSupported`),
 * returns the label alone, so the output is safe to print anywhere. The label
 * may already contain colors.
 * @param label - The visible text.
 * @param url - The link target.
 * @param options - `enabled`: skip the detection; `stream`: the stream to check (defaults to `process.stdout`); `id`: link ID.
 * @returns The label wrapped in link escape sequences, or the label alone.
 * @example
 * console.log(`See ${formatTerminalLink('the docs', 'https://example.com/docs')}`);
 * @example
 * // Always emit the escape sequences
 * formatTerminalLink('docs', 'https://example.com', {enabled: true});
 * // '\u001B]8;;https://example.com\u0007docs\u001B]8;;\u0007'
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const formatTerminalLink = hyperlink;
