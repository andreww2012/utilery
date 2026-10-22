const PATH_SEPARATOR_REGEX = /[/\\]/;
// A leading slash or backslash (including UNC paths) or a Windows drive letter
const ROOTED_PATH_REGEX = /^(?:[/\\]|[a-z]:)/i;

/**
 * Checks whether a path is relative and stays inside the directory it is
 * resolved against, so it is safe to join with that directory: like a path
 * from an archive entry, a URL or user input. Works with both `/` and `\`
 * separators, on any platform.
 *
 * Rejects empty paths, absolute paths, Windows drive letters (`C:\`, `C:a`)
 * and UNC paths (`\\server\share`), null characters, and paths whose `..`
 * segments climb above the start (`a/../../b`). A `..` that stays inside
 * (`a/../b`) is fine.
 * @param path - The path to check.
 * @returns `true` if the path is relative and never leaves its base directory, otherwise `false`.
 * @example
 * isSafeRelativePath('docs/readme.md');
 * // true
 * isSafeRelativePath('docs/../readme.md');
 * // true
 * @example
 * isSafeRelativePath('../etc/passwd');
 * // false
 * isSafeRelativePath('/etc/passwd');
 * // false
 * isSafeRelativePath('C:\\Windows');
 * // false
 * isSafeRelativePath('a\\..\\..\\b');
 * // false
 */
export const isSafeRelativePath = (path: string) => {
  if (!path || path.includes('\0') || ROOTED_PATH_REGEX.test(path)) {
    return false;
  }

  let depth = 0;
  return path.split(PATH_SEPARATOR_REGEX).every((segment) => {
    if (segment === '..') {
      depth--;
    } else if (segment !== '' && segment !== '.') {
      depth++;
    }

    return depth >= 0;
  });
};
