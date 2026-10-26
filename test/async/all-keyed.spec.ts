import {allKeyed} from '../../src/async/all-keyed.ts';
import {expectOwnProtoKey} from '../own-proto-key.ts';

describe('async/allKeyed', () => {
  it('basic test', async () => {
    const result = await allKeyed({
      first: Promise.resolve(1),
      second: Promise.resolve('hi'),
    });

    expect(result).toStrictEqual({first: 1, second: 'hi'});
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', async () => {
    const tasks = Object.defineProperty({}, '__proto__', {
      value: Promise.resolve({isAdmin: true}),
      enumerable: true,
    });

    expectOwnProtoKey(await allKeyed(tasks));
  });
});
