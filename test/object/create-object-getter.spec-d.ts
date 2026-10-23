import {createObjectGetter} from '../../src/object/create-object-getter.ts';

describe('object/createObjectGetter', () => {
  it('accepts the type of the object as a type argument', () => {
    expectTypeOf(createObjectGetter<{a: number}>)
      .parameter(0)
      .toEqualTypeOf<{a: number}>();
  });
});
