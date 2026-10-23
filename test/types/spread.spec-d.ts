import type {Spread} from '../../src/types/spread.ts';

describe('types/Spread', () => {
  it('basic test', () => {
    expectTypeOf<Spread<{a: 1; b: 2}, {b: 3; c: 4}>>().toEqualTypeOf<{a: 1; b: 3; c: 4}>();
  });

  it('joins the types of a property that is optional in the second type', () => {
    expectTypeOf<Spread<{a: number; b?: string}, {b?: number; c: boolean}>>().toEqualTypeOf<{
      a: number;
      b?: string | number;
      c: boolean;
    }>();
  });
});
