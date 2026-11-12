import {type MaybeFn, maybeCall} from '../../src/function/maybe-call.ts';

const sideEffect = (): void => undefined;

describe('function/maybeCall', () => {
  it('narrows the return type to the plain value type', () => {
    expectTypeOf(maybeCall(42)).toEqualTypeOf<number>();
    expectTypeOf(maybeCall(null)).toEqualTypeOf<null>();
    // eslint-disable-next-line ts/no-confusing-void-expression -- the typed-lint rule misreads this result as `void`; it resolves to `undefined`
    expectTypeOf(maybeCall(undefined)).toEqualTypeOf<undefined>();
  });

  it('narrows to the function return type, not a union with the function itself', () => {
    expectTypeOf(maybeCall(() => 42)).toEqualTypeOf<number>();
    expectTypeOf(
      maybeCall((first: number, second: number) => first + second, 1, 2),
    ).toEqualTypeOf<number>();
    // eslint-disable-next-line ts/no-confusing-void-expression, ts/no-invalid-void-type -- intentionally asserting the `void` return type of a side-effect getter
    expectTypeOf(maybeCall(sideEffect)).toEqualTypeOf<void>();
  });

  it('resolves a MaybeFn to the underlying value type', () => {
    const fallback: MaybeFn<string> = 'static';

    expectTypeOf(maybeCall(fallback)).toEqualTypeOf<string>();
  });

  it('distributes over a union of a value and a function, yielding the union of results', () => {
    const valueOrGetter = 'x' as string | (() => number);

    expectTypeOf(maybeCall(valueOrGetter)).toEqualTypeOf<string | number>();

    const optionalGetter = null as null | (() => number);

    expectTypeOf(maybeCall(optionalGetter)).toEqualTypeOf<number | null>();
  });

  it('rejects arguments for a plain value', () => {
    // @ts-expect-error a plain (non-function) value accepts no arguments
    maybeCall(42, 'extra');
  });

  it('requires the function arguments and checks their types', () => {
    // @ts-expect-error the function requires one argument
    maybeCall((value: number) => value);

    // @ts-expect-error the argument must be a number
    maybeCall((value: number) => value, 'not a number');
  });
});
