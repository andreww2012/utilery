import {interopDefault} from '../../src/misc/interop-default.ts';
import type {MaybePromise} from '../../src/types/maybe-promise.ts';

declare const functionWithDefault: (() => void) & {default: string};
declare const maybeUndefinedDefault: {default: number | undefined};
declare const maybeNullDefault: {default: string | null; named: 1};
declare const unknownDefault: {default: unknown};
declare const unionOfModules: {default: 1} | {named: 2};
declare const moduleOrDefault: {rules: 1} | {default: {rules: 1}};

// Only compile when `T | {default: T}` resolves to `T` in generic code
const loadModule = <T>(load: () => MaybePromise<T | {default: T}>): Promise<T> =>
  interopDefault(load());
const loadObjectModule = <T extends object>(load: () => Promise<T | {default: T}>): Promise<T> =>
  interopDefault(load());
const passThrough = <Module>(module: Module) => interopDefault(module);

describe('misc/interopDefault', () => {
  it('resolves to the type of the default export', () => {
    expectTypeOf(interopDefault({default: 42, named: 'x'})).toEqualTypeOf<Promise<number>>();
    expectTypeOf(interopDefault(Promise.resolve({default: 'value'}))).toEqualTypeOf<
      Promise<string>
    >();
    expectTypeOf(interopDefault(functionWithDefault)).toEqualTypeOf<Promise<string>>();
  });

  it('resolves to the module type when there is no default export', () => {
    expectTypeOf(interopDefault({named: 'x'})).toEqualTypeOf<Promise<{named: string}>>();
    expectTypeOf(interopDefault(Promise.resolve(1))).toEqualTypeOf<Promise<number>>();
    expectTypeOf(interopDefault(null)).toEqualTypeOf<Promise<null>>();
  });

  it('resolves to the module type when the default export is nullish', () => {
    expectTypeOf(interopDefault({default: undefined, named: 'x'})).toEqualTypeOf<
      Promise<{default: undefined; named: string}>
    >();
    expectTypeOf(interopDefault({default: null})).toEqualTypeOf<Promise<{default: null}>>();
  });

  it('resolves to the default export or the module when the default export may be nullish', () => {
    expectTypeOf(interopDefault(maybeUndefinedDefault)).toEqualTypeOf<
      Promise<number | {default: number | undefined}>
    >();
    expectTypeOf(interopDefault(maybeNullDefault)).toEqualTypeOf<
      Promise<string | {default: string | null; named: 1}>
    >();
    expectTypeOf(interopDefault(unknownDefault)).toEqualTypeOf<Promise<unknown>>();
  });

  it('resolves each module of a union', () => {
    expectTypeOf(interopDefault(unionOfModules)).toEqualTypeOf<Promise<1 | {named: 2}>>();
    expectTypeOf(interopDefault(Promise.resolve(unionOfModules))).toEqualTypeOf<
      Promise<1 | {named: 2}>
    >();
  });

  it('resolves `T | {default: T}` to `T`, also in generic code', () => {
    expectTypeOf(interopDefault(moduleOrDefault)).toEqualTypeOf<Promise<{rules: 1}>>();
    expectTypeOf(loadModule<number>).returns.toEqualTypeOf<Promise<number>>();
    expectTypeOf(loadObjectModule<{a: 1}>).returns.toEqualTypeOf<Promise<{a: 1}>>();
  });

  it('keeps a generic module type, to be resolved where it is known', () => {
    expectTypeOf(passThrough({default: 1})).toEqualTypeOf<Promise<number>>();
    expectTypeOf(passThrough({named: 'x'})).toEqualTypeOf<Promise<{named: string}>>();
  });
});
