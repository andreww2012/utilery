import {traverseMap} from '../../src/traverse/traverse-map.ts';
import {parseUntrusted} from '../own-proto-key.ts';

describe('traverse/traverseMap', () => {
  it('returns a transformed copy without mutating the input', () => {
    const input = {count: 1, nested: {count: 2}};
    const result = traverseMap(input, (context, node) => {
      if (typeof node === 'number') {
        context.update(node + 1);
      }
    });

    expect(result).toStrictEqual({count: 2, nested: {count: 3}});
    expect(input).toStrictEqual({count: 1, nested: {count: 2}});
    expect(result).not.toBe(input);
  });

  it('keeps a hostile prototype off the mapped result', () => {
    const evil = parseUntrusted('{"user":"bob","__proto__":{"isAdmin":true}}');
    const result = traverseMap(evil, () => undefined);

    expect(result.isAdmin).toBeUndefined();
  });
});
