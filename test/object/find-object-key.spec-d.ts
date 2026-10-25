import {findObjectKey} from '../../src/object/find-object-key.ts';

const symbolKey = Symbol('s');

enum Color {
  Red = 'red',
  Blue = 'blue',
}

declare const mixedKeys: {a: number; 1: string; [symbolKey]: boolean};
declare const enumKeys: Record<Color, number>;
declare const scores: Record<string, number>;

describe('object/findObjectKey', () => {
  it('types the keys as Object.keys gives them', () => {
    findObjectKey(mixedKeys, (value, key) => {
      expectTypeOf(key).toEqualTypeOf<'a' | '1'>();
      return true;
    });

    expectTypeOf(findObjectKey(mixedKeys, () => true)).toEqualTypeOf<'a' | '1' | undefined>();
    expectTypeOf(findObjectKey(mixedKeys, () => true, true)).toEqualTypeOf<'a' | '1' | undefined>();
  });

  it('keeps string enum keys as the enum type', () => {
    expectTypeOf(findObjectKey(enumKeys, () => true)).toEqualTypeOf<Color | undefined>();
  });

  it('types a key of a record with a string index as a string', () => {
    expectTypeOf(findObjectKey(scores, (value) => value > 0)).toEqualTypeOf<string | undefined>();
  });
});
