import {link} from 'clickable-path';
import type {FormatTerminalLinkOptions} from './format-terminal-link.ts';

/** Options of `formatTerminalFileLink` */
export interface FormatTerminalFileLinkOptions extends FormatTerminalLinkOptions {
  /**
   * Builds the label from the absolute path and the `line` and `column`, like
   * `(path) => path.replace(rootDirectory, '~')`.
   * The link still points to the file, at the position.
   * Defaults to the path relative to `cwd`, with `:<line>:<column>` after it
   */
  formatter?: (absolutePath: string, line?: number, column?: number) => string;

  /**
   * The directory to resolve a relative path against.
   * Defaults to `process.cwd()`, read on every call
   */
  cwd?: string;

  /** The line to open, from `1`: shown as `:<line>` in the default label */
  line?: number;

  /** The column to open, from `1`: shown as `:<column>` after the line in the default label */
  column?: number;
}

/**
 * Formats a file path as a clickable terminal link (the OSC 8 escape sequence) that opens the file.
 */
export const formatTerminalFileLink: {
  /**
   * Formats a file path as a clickable terminal link (the OSC 8 escape sequence)
   * that opens the file.
   * The label is the path relative to `cwd`, followed by `:<line>:<column>` when
   * given; editors like VS Code open the file at that position.
   *
   * Windows paths are handled on any platform.
   * When the terminal does not support links (see `isTerminalLinkSupported`),
   * returns the label alone.
   * @param path - The path of the file, absolute or relative to `cwd`.
   * @param options - `line` and `column`: the position; `cwd`: the base directory (defaults to
   * `process.cwd()`); `formatter`: builds a custom label; plus the options of `formatTerminalLink`.
   * @returns The label wrapped in link escape sequences, or the label alone.
   * @example
   * // In /repo
   * console.log(formatTerminalFileLink('/repo/src/index.ts', {line: 12, column: 3}));
   * // Shows 'src/index.ts:12:3', which opens file:///repo/src/index.ts#L12,3
   * @example
   * // Custom label
   * formatTerminalFileLink(configPath, {
   *   formatter: (absolutePath) => absolutePath.replace(homeDirectory, '~'),
   * });
   */
  (path: string, options?: FormatTerminalFileLinkOptions): string;
} = link;
