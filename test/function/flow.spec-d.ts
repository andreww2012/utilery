import {flow} from '../../src/function/flow.ts';

const addOne = (value: number) => value + 1;
const toLabel = (value: number) => `result: ${value}`;
const add = (a: number, b: number) => a + b;

describe('function/flow', () => {
  it('takes the parameters of the first function and gives the result of the last one', () => {
    expectTypeOf(flow([add, toLabel])).toEqualTypeOf<(a: number, b: number) => string>();
    // eslint-disable-next-line unicorn/no-unnecessary-default-arguments -- the default is passed on purpose
    expectTypeOf(flow([add, toLabel], false)).toEqualTypeOf<(a: number, b: number) => string>();
  });

  it('starts from the last function when composing from the right', () => {
    expectTypeOf(flow([toLabel, add], true)).toEqualTypeOf<(a: number, b: number) => string>();
  });

  it('gives the types of every function for an array of functions', () => {
    const functions = [addOne, toLabel];

    expectTypeOf(flow(functions)).toBeCallableWith(1);
    expectTypeOf(flow(functions)).returns.toEqualTypeOf<number | string>();
  });

  it('gives unknown types when the direction is only known at runtime', () => {
    const isReversed = Math.random() > 0.5;

    expectTypeOf(flow([addOne, toLabel], isReversed)).toEqualTypeOf<
      (...arguments_: never[]) => unknown
    >();
  });
});
