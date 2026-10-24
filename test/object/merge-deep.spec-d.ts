import {mergeDeep} from '../../src/object/merge-deep.ts';

describe('object/mergeDeep', () => {
  it('infers the deeply merged type', () => {
    expectTypeOf(mergeDeep({a: 1, b: {x: 1}}, {b: {x: 'y'}, c: true})).toEqualTypeOf<{
      a: number;
      b: {x: string};
      c: boolean;
    }>();
    expectTypeOf(mergeDeep({a: 1}, {b: 2}, {copy: true})).toEqualTypeOf<{a: number; b: number}>();
  });

  it('falls back to the merged object type with a custom resolver', () => {
    expectTypeOf(mergeDeep({a: 1}, {b: 2}, {mergeValues: () => undefined})).toEqualTypeOf<{
      a: number;
      b: number;
    }>();
  });

  it('gives `any` for an `any` target', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf(mergeDeep({} as any, {b: 2})).toBeAny();
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf(mergeDeep({} as any, {b: 2}, {mergeValues: () => undefined})).toBeAny();
  });
});
