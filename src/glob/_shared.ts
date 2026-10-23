/** Options of the `glob` utilities */
export interface GlobOptions {
  /**
   * Lets `*`, `**` and other wildcards match names starting with a dot, like
   * `.git` or `.env`, which they skip by default.
   * Defaults to `false`
   */
  dot?: boolean;

  /**
   * Matches regardless of letter case.
   * Defaults to `false`
   */
  caseInsensitive?: boolean;

  /**
   * Also treats `\` in paths as a separator, for Windows paths.
   * Defaults to `false`
   */
  windows?: boolean;

  /**
   * Matches patterns without a slash (like `*.js`) against the last part of the
   * path only, so they match in any directory.
   * Defaults to `false`
   */
  matchBasename?: boolean;
}

export const toPicomatchOptions = (options: GlobOptions = {}) => ({
  dot: options.dot,
  nocase: options.caseInsensitive, // cspell:disable-line
  windows: options.windows || false,
  basename: options.matchBasename,
});
