import {quoteForShell} from 'puka';

/**
 * Quotes a string so that a shell passes it to a command as one argument,
 * unchanged. Use it when building a command string for `child_process.exec`,
 * `spawn` with `{shell: true}` or a script.
 *
 * Quotes for `cmd.exe` on Windows and for POSIX shells (`sh`, `bash`, `zsh`,
 * etc.) elsewhere; pass `platform` (a `process.platform` value) to target
 * another one. Strings that need no quotes are returned as is, unless `force`
 * is `true`. Throws an `Error` for line breaks on Windows, which `cmd.exe`
 * cannot pass safely.
 *
 * Prefer passing arguments as an array to `spawn` or `execFile` without a
 * shell when possible: then no quoting is needed at all.
 * @param argument - The argument to quote.
 * @param options - Options.
 * @param options.platform - The platform to quote for, a `process.platform` value (defaults to the current one).
 * @param options.force - Always add quotes (defaults to `false`).
 * @returns The argument, quoted and escaped if needed.
 * @example
 * // On Linux or macOS
 * quoteShellArgument('file name.txt');
 * // "'file name.txt'"
 * quoteShellArgument("it's");
 * // `'it'\''s'`
 * quoteShellArgument('simple');
 * // 'simple'
 * @example
 * // For Windows
 * quoteShellArgument('file name.txt', {platform: 'win32'});
 * // '"file name.txt"'
 * quoteShellArgument('a&b', {platform: 'win32'});
 * // '"a&b"'
 */
// Annotated: the package has no types of its own, so the published declarations would say `any`
export const quoteShellArgument = (
  argument: string,
  options: {platform?: NodeJS.Platform; force?: boolean} = {},
): string => quoteForShell(argument, options.force, options.platform);
