import {replaceKeys} from '../../src/object/replace-keys.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/replaceKeys', () => {
  it('replaces a substring in the top-level keys only', () => {
    expect(replaceKeys({foo_bar: {foo_baz: 1}}, 'foo_', 'x_')).toStrictEqual({
      x_bar: {foo_baz: 1},
    });
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(replaceKeys(parseUntrusted(), 'x', 'y'));
    expectOwnProtoKey(replaceKeys({x__proto__: {isAdmin: true}}, 'x', ''));
  });
});
