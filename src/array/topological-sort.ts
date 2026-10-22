import toposort from 'toposort';

/** Thrown by `topologicalSort` when the dependencies form a cycle */
export class CyclicDependencyError<T = unknown> extends Error {
  override name = 'CyclicDependencyError';

  /** The nodes of the cycle, starting and ending with the same node */
  readonly cycle: T[];

  constructor(cycle: T[], options?: ErrorOptions) {
    super(`Cyclic dependency: ${cycle.map(String).join(' -> ')}`, options);
    this.cycle = cycle;
  }
}

const findCycle = <T>(nodes: readonly T[], dependenciesOf: ReadonlyMap<T, readonly T[]>) => {
  const finished = new Set<T>();
  const path: T[] = [];
  let cycle: T[] | undefined;

  const hasCycleFrom = (node: T): boolean => {
    const index = path.indexOf(node);
    if (index !== -1) {
      cycle = [...path.slice(index), node];
      return true;
    }

    if (finished.has(node)) {
      return false;
    }

    path.push(node);
    const isCycleFound = (dependenciesOf.get(node) || []).some(hasCycleFrom);
    path.pop();
    finished.add(node);
    return isCycleFound;
  };

  return nodes.some(hasCycleFrom) ? cycle : undefined;
};

/**
 * Orders nodes so that every node comes after its dependencies, like build
 * steps, packages of a monorepo or modules to load. Nodes can be any values
 * (compared by identity); dependencies that are missing from `nodes` are added
 * to the result too. Independent nodes keep their order as far as possible.
 *
 * Throws a `CyclicDependencyError` when the dependencies form a cycle; its
 * `cycle` property lists the nodes of the cycle.
 * @param nodes - The nodes to sort.
 * @param getDependencies - Returns the nodes a node depends on.
 * @returns The nodes, each after all its dependencies.
 * @example
 * const dependencies = {app: ['ui', 'utils'], ui: ['utils'], utils: []};
 * topologicalSort(['app', 'ui', 'utils'], (name) => dependencies[name]);
 * // ['utils', 'ui', 'app']
 * @example
 * topologicalSort(['a', 'b'], (name) => (name === 'a' ? ['b'] : ['a']));
 * // throws CyclicDependencyError: 'Cyclic dependency: a -> b -> a'
 */
export const topologicalSort = <T>(
  nodes: Iterable<T>,
  getDependencies: (node: T) => Iterable<T>,
) => {
  const dependenciesOf = new Map<T, T[]>();
  // Dependencies outside the given nodes are collected too, as the package requires every node
  const collect = (node: T) => {
    if (dependenciesOf.has(node)) {
      return;
    }

    const dependencies = [...getDependencies(node)];
    dependenciesOf.set(node, dependencies);
    dependencies.forEach(collect);
  };
  for (const node of nodes) {
    collect(node);
  }

  const allNodes = [...dependenciesOf.keys()];
  const edges = allNodes.flatMap((node) =>
    (dependenciesOf.get(node) || []).map((dependency): [T, T] => [dependency, node]),
  );

  try {
    return toposort.array(allNodes, edges);
  } catch (error) {
    const cycle = findCycle(allNodes, dependenciesOf);
    if (cycle) {
      throw new CyclicDependencyError(cycle, {cause: error});
    }

    throw error;
  }
};
