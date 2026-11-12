import {flowAsync} from '../../src/function/flow-async.ts';

const addAsync = (a: number, b: number) => Promise.resolve(a + b);
const toLabel = (value: number) => `result: ${value}`;

describe('function/flowAsync', () => {
  it('takes the parameters of the first function and gives the awaited result of the last one', () => {
    expectTypeOf(flowAsync([addAsync, toLabel])).toEqualTypeOf<
      (a: number, b: number) => Promise<string>
    >();
  });

  it('starts from the last function when composing from the right', () => {
    expectTypeOf(flowAsync([addAsync, toLabel], true)).toEqualTypeOf<
      (value: number) => Promise<number>
    >();
  });

  it('gives unknown types when the direction is only known at runtime', () => {
    const isReversed = Math.random() > 0.5;

    expectTypeOf(flowAsync([addAsync, toLabel], isReversed)).toEqualTypeOf<
      (...arguments_: never[]) => Promise<unknown>
    >();
  });
});
