import envPaths from 'env-paths';

/**
 * Gets the standard directories of the current operating system for storing
 * an app's data, config, cache, logs and temporary files. Only builds the
 * paths: the directories are not created.
 *
 * On Linux, follows the XDG Base Directory spec (`XDG_CONFIG_HOME`, etc.); on
 * macOS, uses `~/Library`; on Windows, `%APPDATA%` and `%LOCALAPPDATA%`.
 *
 * A `-nodejs` suffix is added to the name by default to avoid clashing with a
 * native app of the same name; pass `{suffix: ''}` to leave the name as is.
 * Throws an `Error` if the name is not a safe file name (empty, `.`, `..`, or
 * containing a path separator).
 * @param name - The name of the app.
 * @param options - Options.
 * @param options.suffix - Appended to the name after a dash (defaults to `'nodejs'`; an empty string adds nothing).
 * @returns The `data`, `config`, `cache`, `log` and `temp` directory paths.
 * @example
 * // On Linux
 * getAppPaths('my-cli').cache;
 * // '/home/user/.cache/my-cli-nodejs'
 * getAppPaths('my-cli', {suffix: ''}).config;
 * // '/home/user/.config/my-cli'
 * @example
 * // On macOS
 * getAppPaths('my-cli').data;
 * // '/Users/user/Library/Application Support/my-cli-nodejs'
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export…from` would inherit the upstream docs
export const getAppPaths = envPaths;
