import {setByPathImmutable} from '../../src/object/set-by-path-immutable.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey} from '../own-proto-key.ts';

describe('object/setByPathImmutable', () => {
  it('replaces the value at a deep path', () => {
    expect(setByPathImmutable({a: {b: 1}}, ['a', 'b'], 2)).toStrictEqual({a: {b: 2}});
  });

  it('does not mutate the input', () => {
    const source = {a: {b: 1}};
    const result = setByPathImmutable(source, ['a', 'b'], 2);

    expect(source).toStrictEqual({a: {b: 1}});
    expect(result).not.toBe(source);
  });

  it('defines a __proto__ segment of an array as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(
      setByPathImmutable([{}] as unknown[], ['__proto__'] as never, {isAdmin: true} as never),
      {isAdmin: true},
      Array.prototype,
    );
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ segment of an array given as %s as an own property',
    (_, convert) => {
      expectOwnProtoKey(
        setByPathImmutable(
          [{}] as unknown[],
          [convert('__proto__')] as never,
          {isAdmin: true} as never,
        ),
        {isAdmin: true},
        Array.prototype,
      );
    },
  );
});
