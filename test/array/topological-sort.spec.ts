import {CyclicDependencyError, topologicalSort} from '../../src/array/topological-sort.ts';

const getOtherNode = (name: string) => [name === 'a' ? 'b' : 'a'];

describe('array/topologicalSort', () => {
  const dependencies: Record<string, string[]> = {app: ['ui', 'utils'], ui: ['utils'], utils: []};

  it('puts dependencies first', () => {
    expect(
      topologicalSort(['app', 'ui', 'utils'], (name) => dependencies[name] || []),
    ).toStrictEqual(['utils', 'ui', 'app']);
  });

  it('adds dependencies missing from the nodes', () => {
    expect(topologicalSort(['app'], (name) => dependencies[name] || [])).toStrictEqual([
      'utils',
      'ui',
      'app',
    ]);
  });

  it('keeps the order of independent nodes', () => {
    expect(topologicalSort(['a', 'b', 'c'], () => [])).toStrictEqual(['a', 'b', 'c']);
  });

  it('compares objects by identity', () => {
    const first = {name: 'first'};
    const second = {name: 'second'};

    expect(
      topologicalSort([first, second], (node) => (node === first ? [second] : [])),
    ).toStrictEqual([second, first]);
  });

  it('throws on a cycle, listing it', () => {
    expect(() => topologicalSort(['a', 'b'], getOtherNode)).toThrow(
      new CyclicDependencyError(['a', 'b', 'a']),
    );
    expect(() =>
      topologicalSort(['x', 'self'], (name) => (name === 'self' ? ['self'] : [])),
    ).toThrow(
      expect.objectContaining({
        name: 'CyclicDependencyError',
        cycle: ['self', 'self'],
      }) as Error,
    );
  });
});
