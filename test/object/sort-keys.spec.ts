import {sortKeys} from '../../src/object/sort-keys.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/sortKeys', () => {
  it('basic test', () => {
    expect(Object.keys(sortKeys({b: 1, a: 2, c: 3}))).toStrictEqual(['a', 'b', 'c']);
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(sortKeys(parseUntrusted()));
  });
});
