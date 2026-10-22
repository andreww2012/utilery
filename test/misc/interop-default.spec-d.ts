import {interopDefault} from '../../src/misc/interop-default.ts';

describe('misc/interopDefault', () => {
  it('resolves to the type of the default export', () => {
    expectTypeOf(interopDefault({default: 42, named: 'x'})).toEqualTypeOf<Promise<number>>();
    expectTypeOf(interopDefault(Promise.resolve({default: 'value'}))).toEqualTypeOf<
      Promise<string>
    >();
  });

  it('resolves to the module type when there is no default export', () => {
    expectTypeOf(interopDefault({named: 'x'})).toEqualTypeOf<Promise<{named: string}>>();
    expectTypeOf(interopDefault(Promise.resolve(1))).toEqualTypeOf<Promise<number>>();
  });

  it('resolves to the module type when the default export is nullish', () => {
    expectTypeOf(interopDefault({default: undefined, named: 'x'})).toEqualTypeOf<
      Promise<{default: undefined; named: string}>
    >();
  });
});
