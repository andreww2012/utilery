import {mapKeys} from '../../src/object/map-keys.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/mapKeys', () => {
  it('basic test', () => {
    expect(mapKeys({a: 1, b: 2}, (value, key) => `${key}!`)).toStrictEqual({'a!': 1, 'b!': 2});
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(mapKeys(parseUntrusted(), (value, key) => key));
    expectOwnProtoKey(mapKeys({a: {isAdmin: true}}, () => '__proto__'));
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ key given as %s as an own property',
    (_, convert) => {
      expectOwnProtoKey(mapKeys({a: {isAdmin: true}}, () => convert('__proto__') as never));
    },
  );
});
