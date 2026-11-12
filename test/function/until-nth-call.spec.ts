import {untilNthCall} from '../../src/function/until-nth-call.ts';

describe('function/untilNthCall', () => {
  it('basic test', () => {
    const calls: number[] = [];
    const gated = untilNthCall(3, (value: number) => {
      calls.push(value);
    });

    gated(1);
    gated(2);
    gated(3);
    gated(4);

    expect(calls).toStrictEqual([1, 2]);
  });
});
