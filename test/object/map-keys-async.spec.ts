import {mapKeysAsync} from '../../src/object/map-keys-async.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/mapKeysAsync', () => {
  it('maps keys with an async function', async () => {
    await expect(
      mapKeysAsync({a: 1, b: 2}, (value, key) => Promise.resolve(`${key}${value}`)),
    ).resolves.toStrictEqual({a1: 1, b2: 2});
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', async () => {
    expectOwnProtoKey(await mapKeysAsync(parseUntrusted(), (value, key) => Promise.resolve(key)));
    expectOwnProtoKey(await mapKeysAsync({a: {isAdmin: true}}, () => Promise.resolve('__proto__')));
  });

  it.each(KEY_CONVERSIONS)(
    'defines a __proto__ key given as %s as an own property',
    async (_, convert) => {
      expectOwnProtoKey(
        await mapKeysAsync({a: {isAdmin: true}}, () =>
          Promise.resolve(convert('__proto__') as never),
        ),
      );
    },
  );
});
