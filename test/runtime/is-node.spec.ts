import {isNode} from '../../src/runtime/is-node.ts';

describe('runtime/isNode', () => {
  it('returns `true` in Node.js and in runtimes compatible with it, like Bun', () => {
    expect(isNode()).toBe(true);
  });
});
