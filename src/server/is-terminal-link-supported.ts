// cspell:ignore Ghostty
import {supportsHyperlinks} from 'clickable-path';

/**
 * Checks whether the terminal is likely to support clickable links (the OSC 8
 * escape sequence), based on the environment: the terminal app and its
 * version, `NO_COLOR`, CI and whether the stream is a TTY.
 *
 * `FORCE_HYPERLINK` overrides the detection (`1` to enable, `0` to disable).
 * Evaluated on every call, as the environment may change.
 * @param stream - The stream the links will be written to (defaults to `process.stdout`).
 * @returns `true` if links can be emitted, otherwise `false`.
 * @example
 * isTerminalLinkSupported();
 * // true in iTerm2, VS Code, Ghostty, WezTerm, Windows Terminal, etc.
 * isTerminalLinkSupported(process.stderr);
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const isTerminalLinkSupported = supportsHyperlinks;
