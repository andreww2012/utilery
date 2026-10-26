import {objectFromKeys} from '../../src/object/object-from-keys.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey} from '../own-proto-key.ts';

describe('object/objectFromKeys', () => {
  it('builds an object mapping each key to its computed value', () => {
    expect(objectFromKeys(['a', 'bb'], (key) => key.length)).toStrictEqual({a: 1, bb: 2});
  });

  it('passes the index to the mapper', () => {
    expect(objectFromKeys(['x', 'y'], (key, index) => `${key}${index}`)).toStrictEqual({
      x: 'x0',
      y: 'y1',
    });
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(objectFromKeys(['__proto__'], () => ({isAdmin: true})));
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ key given as %s as an own property',
    (_, convert) => {
      expectOwnProtoKey(objectFromKeys([convert('__proto__') as never], () => ({isAdmin: true})));
    },
  );
});
