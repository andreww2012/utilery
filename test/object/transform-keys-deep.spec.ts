import {transformKeysDeep} from '../../src/object/transform-keys-deep.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/transformKeysDeep', () => {
  it('applies the transform to every key recursively', () => {
    expect(transformKeysDeep({aB: {cD: 1}}, (key) => key.toUpperCase())).toStrictEqual({
      AB: {CD: 1},
    });
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(transformKeysDeep(parseUntrusted(), (key) => key));
    expectOwnProtoKey(
      transformKeysDeep(parseUntrusted('{"a": {"__proto__": {"isAdmin": true}}}'), (key) => key).a,
    );
    expectOwnProtoKey(
      transformKeysDeep({a: {isAdmin: true}}, (key) => (key === 'a' ? '__proto__' : key)),
    );
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ key given as %s as an own property',
    (_, convert) => {
      expectOwnProtoKey(
        transformKeysDeep({a: {isAdmin: true}}, (key) =>
          key === 'a' ? (convert('__proto__') as never) : key,
        ),
      );
    },
  );
});
