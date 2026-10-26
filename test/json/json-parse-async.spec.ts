import {jsonParseAsync} from '../../src/json/json-parse-async.ts';
import {PROTO_KEY_JSON, expectOwnProtoKey} from '../own-proto-key.ts';

describe('json/jsonParseAsync', () => {
  it('parses asynchronously', async () => {
    await expect(jsonParseAsync('{"a":1,"b":[2,3]}')).resolves.toStrictEqual({a: 1, b: [2, 3]});
  });

  it('applies a reviver', async () => {
    const result = await jsonParseAsync('{"a":1}', (key, value) =>
      typeof value === 'number' ? value * 2 : value,
    );

    expect(result).toStrictEqual({a: 2});
  });

  it('accepts an intensity argument', async () => {
    await expect(jsonParseAsync('{"a":1}', undefined, 8)).resolves.toStrictEqual({a: 1});
  });

  it('rejects on invalid JSON', async () => {
    await expect(jsonParseAsync('{invalid}')).rejects.toBeDefined();
  });

  // An undeclared variable assignment leaks a global here, but throws in the strict-mode build
  it('does not assign undeclared variables', async () => {
    await jsonParseAsync('{"a":"b"}');

    expect(globalThis).not.toHaveProperty('chunk');
  });

  it('parses a __proto__ key as an own property, like JSON.parse', async () => {
    expectOwnProtoKey(await jsonParseAsync(PROTO_KEY_JSON));
    expectOwnProtoKey(
      ((await jsonParseAsync('{"a": {"__proto__": {"isAdmin": true}}}')) as {a: unknown}).a,
    );
    expectOwnProtoKey(await jsonParseAsync(PROTO_KEY_JSON, (key, value: unknown) => value));
  });
});
