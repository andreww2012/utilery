import {type LinkOptions, link} from 'clickable-path';

export type {LinkOptions as FormatTerminalFileLinkOptions} from 'clickable-path';

/**
 * Formats a file path as a clickable terminal link (the OSC 8 escape sequence)
 * that opens the file. The label is the path relative to `cwd`, followed by
 * `:<line>:<column>` when given; editors like VS Code open the file at that
 * position.
 *
 * Windows paths are handled on any platform. When the terminal does not
 * support links (see `isTerminalLinkSupported`), returns the label alone.
 * @param path - The path of the file, absolute or relative to `cwd`.
 * @param options - `line` and `column`: the position; `cwd`: the base directory (defaults to `process.cwd()`); `formatter`: builds a custom label; plus the options of `formatTerminalLink`.
 * @returns The label wrapped in link escape sequences, or the label alone.
 * @example
 * // In /repo
 * console.log(formatTerminalFileLink('/repo/src/index.ts', {line: 12, column: 3}));
 * // Shows 'src/index.ts:12:3', which opens file:///repo/src/index.ts#L12,3
 * @example
 * // Custom label
 * formatTerminalFileLink(configPath, {formatter: (absolutePath) => absolutePath.replace(homeDirectory, '~')});
 */
export const formatTerminalFileLink: (path: string, options?: LinkOptions) => string = link;
