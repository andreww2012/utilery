import {fromNthCall} from '../../src/function/from-nth-call.ts';

describe('function/fromNthCall', () => {
  it('basic test', () => {
    const calls: number[] = [];
    const gated = fromNthCall(3, (value: number) => {
      calls.push(value);
    });

    gated(1);
    gated(2);
    gated(3);
    gated(4);

    expect(calls).toStrictEqual([3, 4]);
  });
});
