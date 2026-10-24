import {assignDefaults} from '../../src/object/assign-defaults.ts';

const returnOne = (): number => 1;

describe('object/assignDefaults', () => {
  it('infers a single object type', () => {
    expectTypeOf(assignDefaults({a: 1}, {b: 2})).toEqualTypeOf<{a: number; b: number}>();
    expectTypeOf(assignDefaults({a: 1}, [{b: 2}, {c: 3}])).toEqualTypeOf<{
      a: number;
      readonly b: 2;
      readonly c: 3;
    }>();
  });

  it('keeps the call signature of a function target', () => {
    expectTypeOf(assignDefaults(returnOne, {b: 2})).toEqualTypeOf<(() => number) & {b: number}>();
  });

  it('gives `any` for an `any` target', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf(assignDefaults({} as any, {b: 2})).toBeAny();
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf(assignDefaults({} as any, [{b: 2}])).toBeAny();
  });
});
