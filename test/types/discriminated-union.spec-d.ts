import type {DiscriminatedUnion} from '../../src/types/discriminated-union.ts';

describe('types/DiscriminatedUnion', () => {
  it('basic test', () => {
    expectTypeOf<
      DiscriminatedUnion<'type', {a: {x: 1}; b: {y: 2}}> extends {type: 'a' | 'b'} ? true : false
    >().toEqualTypeOf<true>();
  });

  it('is a union of single object types', () => {
    expectTypeOf<DiscriminatedUnion<'type', {a: {x: 1}; b: {y: 2}}>>().toEqualTypeOf<
      {type: 'a'; x: 1} | {type: 'b'; y: 2}
    >();
  });

  it('gives `any` for `any` members', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    expectTypeOf<DiscriminatedUnion<'type', any>>().toBeAny();
  });
});
