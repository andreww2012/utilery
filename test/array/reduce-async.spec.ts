import {reduceAsync} from '../../src/array/reduce-async.ts';

describe('array/reduceAsync', () => {
  it('basic test', async () => {
    await expect(
      reduceAsync([1, 2, 3, 4], (accumulator, item) => Promise.resolve(accumulator + item), 0),
    ).resolves.toBe(10);
  });

  it('starts from the first item when there is no initial value', async () => {
    const calls: [number, number, number][] = [];

    await expect(
      reduceAsync([1, 2, 3], (accumulator, item, index) => {
        calls.push([accumulator, item, index]);
        return Promise.resolve(accumulator + item);
      }),
    ).resolves.toBe(6);
    expect(calls).toStrictEqual([
      [1, 2, 1],
      [3, 3, 2],
    ]);
  });

  it.each([undefined, null])('uses an explicit `%s` as the initial value', async (initialValue) => {
    await expect(
      reduceAsync(
        [1, 2],
        (accumulator: string, item) => Promise.resolve(`${accumulator},${item}`),
        // eslint-disable-next-line un/no-type-assertion -- a value that is empty at runtime
        initialValue as unknown as string,
      ),
    ).resolves.toBe(`${initialValue},1,2`);
    await expect(
      reduceAsync(
        [],
        (accumulator: unknown) => Promise.resolve(accumulator),
        initialValue as unknown,
      ),
    ).resolves.toBe(initialValue);
  });
});
