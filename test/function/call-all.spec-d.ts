import {callAll} from '../../src/function/call-all.ts';

const double = (value: number) => value * 2;
const callAllIf = (count: number, name: string) => callAll(count && double, name && double);

describe('function/callAll', () => {
  it('returns a function returning nothing, with the arguments of the functions', () => {
    const combined = callAll((value: number) => value, undefined);

    expectTypeOf(combined).parameters.toEqualTypeOf<[number]>();
    expectTypeOf(combined).returns.toBeVoid();
  });

  it('accepts `condition && fn` with conditions of any type', () => {
    expectTypeOf(callAllIf).returns.parameters.toEqualTypeOf<[number]>();
  });
});
