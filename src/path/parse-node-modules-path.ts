// The greedy `.+` makes it match the last `node_modules`, so a nested dependency is found
const NODE_MODULES_PATH_REGEX =
  /^(?<directory>(?:.*[/\\])?node_modules[/\\])(?<name>@[^/\\]+[/\\][^/\\]+|[^/@\\][^/\\]*)(?:[/\\](?<subpath>.*))?$/;

/**
 * Splits the path of a file inside `node_modules` into the `node_modules`
 * directory, the package name and the path inside the package. For nested
 * dependencies, the innermost package is used. Works with both `/` and `\`
 * separators.
 * @param path - The file path.
 * @returns The `directory` (ending with a separator), the package `name` and the `subpath` (`undefined` for the package directory itself), or `undefined` if the path is not inside `node_modules`.
 * @example
 * parseNodeModulesPath('/repo/node_modules/@scope/package/dist/index.js');
 * // {directory: '/repo/node_modules/', name: '@scope/package', subpath: 'dist/index.js'}
 * @example
 * // Nested dependency
 * parseNodeModulesPath('/repo/node_modules/a/node_modules/b/index.js');
 * // {directory: '/repo/node_modules/a/node_modules/', name: 'b', subpath: 'index.js'}
 * @example
 * parseNodeModulesPath('/repo/src/index.ts');
 * // undefined
 */
export const parseNodeModulesPath = (path: string) => {
  const groups = NODE_MODULES_PATH_REGEX.exec(path)?.groups;
  return groups?.directory != null && groups.name != null
    ? {
        directory: groups.directory,
        name: groups.name.replace('\\', '/'),
        subpath: groups.subpath || undefined,
      }
    : undefined;
};
