import {mapValuesAsync} from '../../src/object/map-values-async.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/mapValuesAsync', () => {
  it('maps values with an async function', async () => {
    await expect(
      mapValuesAsync({a: 1, b: 2}, (value) => Promise.resolve(value * 2)),
    ).resolves.toStrictEqual({
      a: 2,
      b: 4,
    });
  });

  it('respects the concurrency limit', async () => {
    let running = 0;
    let maxRunning = 0;

    await mapValuesAsync(
      {a: 1, b: 2, c: 3},
      async (value) => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await Promise.resolve();
        running--;
        return value;
      },
      {concurrency: 1},
    );

    expect(maxRunning).toBe(1);
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', async () => {
    expectOwnProtoKey(await mapValuesAsync(parseUntrusted(), (value) => Promise.resolve(value)));
  });
});
