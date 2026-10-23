import path from 'node:path';

/**
 * Checks whether a path is inside another path, like `src/index.ts` inside
 * `src`.
 * Both paths are resolved against the current directory first, so `.` and `..`
 * segments are handled.
 * The paths are compared as strings: the file system is not accessed and
 * symbolic links are not resolved.
 *
 * A path is not considered inside itself.
 * Unlike a naive `startsWith` check, siblings sharing a prefix (`/a/bc` and
 * `/a/b`) and names starting with two dots (`/a/..b`) are handled correctly, as
 * is a path on another Windows drive.
 * @param childPath - The path that might be inside.
 * @param parentPath - The path that might contain it.
 * @returns `true` if `childPath` is inside `parentPath`, otherwise `false`.
 * @example
 * isPathInside('a/b/c', 'a/b');
 * // true
 * isPathInside('a/b', 'a/b');
 * // false
 * isPathInside('/a/bc', '/a/b');
 * // false
 * @example
 * // Guard against path traversal
 * const filePath = path.join(publicDirectory, request.path);
 * if (!isPathInside(filePath, publicDirectory)) {
 *   throw new Error('Forbidden');
 * }
 */
export const isPathInside = (childPath: string, parentPath: string) => {
  const relativePath = path.relative(parentPath, childPath);
  // An absolute result means another Windows drive, where no relative path exists
  return (
    relativePath.length > 0 &&
    relativePath !== '..' &&
    !relativePath.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relativePath)
  );
};
