import {traverseForEach} from '../../src/traverse/traverse-for-each.ts';
import {parseUntrusted} from '../own-proto-key.ts';

describe('traverse/traverseForEach', () => {
  it('visits every node and exposes path/isLeaf on the context', () => {
    const visited: [PropertyKey[], unknown, boolean][] = [];
    traverseForEach({a: 1, b: {c: 2}}, (context, node) => {
      visited.push([context.path, node, context.isLeaf]);
    });

    expect(visited).toStrictEqual([
      [[], {a: 1, b: {c: 2}}, false],
      [['a'], 1, true],
      [['b'], {c: 2}, false],
      [['b', 'c'], 2, true],
    ]);
  });

  it('mutates the input in place via context.update and returns it', () => {
    const input = [5, -3];
    const result = traverseForEach(input, (context, node) => {
      if (typeof node === 'number' && node < 0) {
        context.update(node + 128);
      }
    });

    expect(result).toBe(input);
    expect(input).toStrictEqual([5, 125]);
  });

  it('does not pollute Object.prototype when walking hostile input', () => {
    const evil = parseUntrusted('{"user":"bob","__proto__":{"isAdmin":true}}');
    traverseForEach(evil, () => undefined);

    expect(({} as Record<string, unknown>).isAdmin).toBeUndefined();
  });
});
