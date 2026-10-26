import {swapObjectKeysValues} from '../../src/object/swap-object-keys-values.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey} from '../own-proto-key.ts';

describe('object/swapObjectKeysValues', () => {
  it('swaps keys and values', () => {
    expect(swapObjectKeysValues({a: 'x', b: 'y'})).toStrictEqual({x: 'a', y: 'b'});
  });

  it('keeps the last key on a value collision', () => {
    expect(swapObjectKeysValues({a: '1', b: '1'})).toStrictEqual({1: 'b'});
  });

  it('groups colliding keys into arrays with an iteratee', () => {
    expect(swapObjectKeysValues({a: 1, b: 2, c: 1}, (value) => `n${value}`)).toStrictEqual({
      n1: ['a', 'c'],
      n2: ['b'],
    });
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(swapObjectKeysValues({a: '__proto__'}), 'a');
    expectOwnProtoKey(
      swapObjectKeysValues({a: '__proto__', b: '__proto__'}, (value) => value),
      ['a', 'b'],
    );
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ key given as %s as an own property',
    (_, convert) => {
      expectOwnProtoKey(
        swapObjectKeysValues({a: convert('__proto__')}, (value) => value as never),
        ['a'],
      );
    },
  );
});
