import {flowAsync} from '../../src/function/flow-async.ts';

const addOneAsync = (value: number) => Promise.resolve(value + 1);
const timesTwo = (value: number) => value * 2;
const toLabel = (value: number) => `result: ${value}`;

describe('function/flowAsync', () => {
  it('threads awaited results left-to-right', async () => {
    const piped = flowAsync([addOneAsync, timesTwo, toLabel]);

    await expect(piped(3)).resolves.toBe('result: 8');
  });

  it('runs right-to-left when `isFromRight` is `true`', async () => {
    const composed = flowAsync([toLabel, timesTwo, addOneAsync], true);

    await expect(composed(3)).resolves.toBe('result: 8');
  });

  it('does not mutate the passed functions array', () => {
    const functions = [toLabel, timesTwo];
    flowAsync(functions, true);

    expect(functions).toStrictEqual([toLabel, timesTwo]);
  });
});
