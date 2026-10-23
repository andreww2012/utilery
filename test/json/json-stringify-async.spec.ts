import {jsonStringifyAsync} from '../../src/json/json-stringify-async.ts';

const nestedValue = {
  array: [1, [2, {a: 3}], [], {}],
  object: {a: {b: 'c'}, empty: {}},
  date: new Date(0),
};

describe('json/jsonStringifyAsync', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('serializes asynchronously', async () => {
    await expect(jsonStringifyAsync({a: 1, b: [2, 3]})).resolves.toBe('{"a":1,"b":[2,3]}');
  });

  it('honors the replacer and space arguments', async () => {
    await expect(jsonStringifyAsync({a: 1, b: 2}, ['a'], 2)).resolves.toBe(
      JSON.stringify({a: 1, b: 2}, ['a'], 2),
    );
  });

  it('honors space alongside a custom intensity', async () => {
    await expect(jsonStringifyAsync({a: 1}, null, 2, 8)).resolves.toBe(
      JSON.stringify({a: 1}, null, 2),
    );
  });

  it('yields to the event loop less often with a higher intensity', async () => {
    const value = Array.from({length: 100_000}, (_, index) => index);
    const setImmediateSpy = vi.spyOn(globalThis, 'setImmediate');

    // eslint-disable-next-line unicorn/no-unnecessary-default-arguments -- To compare with the intensity below
    await jsonStringifyAsync(value, null, 0, 1);
    const lowIntensityTicks = setImmediateSpy.mock.calls.length;
    setImmediateSpy.mockClear();
    await jsonStringifyAsync(value, null, 0, 32);

    expect(setImmediateSpy.mock.calls.length).toBeLessThan(lowIntensityTicks);
  });

  it.each([
    {replacer: null, space: 2},
    {replacer: null, space: '\t'},
    {replacer: null, space: 2.6},
    {replacer: null, space: 15},
    {replacer: null, space: 'abcdefghijkl'},
    {replacer: ['array', 'object', 'a', 'b'], space: 2},
  ])(
    'indents nested values like `JSON.stringify` (replacer: $replacer, space: $space)',
    async ({replacer, space}) => {
      await expect(jsonStringifyAsync(nestedValue, replacer, space)).resolves.toBe(
        JSON.stringify(nestedValue, replacer, space),
      );
    },
  );

  it('accepts numbers and skips duplicates in the replacer array', async () => {
    const value = {1: 'a', b: 2, c: 3};
    const replacer = [1, 'b', 'b', '1'];

    await expect(jsonStringifyAsync(value, replacer)).resolves.toBe(
      JSON.stringify(value, replacer),
    );
  });

  it('calls the replacer like `JSON.stringify`', async () => {
    const replacer = vi.fn<(key: string, item: unknown) => unknown>((_key, item) => item);
    const nativeReplacer = vi.fn<(key: string, item: unknown) => unknown>((_key, item) => item);

    await jsonStringifyAsync(nestedValue, replacer);
    JSON.stringify(nestedValue, nativeReplacer);

    expect(replacer.mock.calls).toStrictEqual(nativeReplacer.mock.calls);
  });

  it.each([
    {name: 'control characters', text: '\u{0}\u{1}\u{B}\u{1F}"\\'},
    {name: 'a long string ending with a control character', text: `${'x'.repeat(150_000)}\u{1}`},
  ])('escapes $name', async ({text}) => {
    await expect(jsonStringifyAsync({text})).resolves.toBe(JSON.stringify({text}));
  });

  it('keeps concurrent calls independent', async () => {
    const shared = {a: 1};
    const manyReferences = {items: Array.from({length: 5000}, (_, index) => ({index, shared}))};
    const values = [
      {text: 'a'.repeat(150_000)},
      {text: 'b'.repeat(150_000)},
      manyReferences,
      manyReferences,
    ];

    const results = await Promise.all(values.map((value) => jsonStringifyAsync(value)));

    expect(results).toStrictEqual(values.map((value) => JSON.stringify(value)));
  });

  it('skips functions, symbols and `undefined` like `JSON.stringify`', async () => {
    const value = {
      function: () => {},
      symbol: Symbol('a'),
      array: [() => {}, Symbol('a'), undefined, 1],
    };

    // eslint-disable-next-line unicorn/no-unsafe-json-serialization -- Native behavior is the expectation
    await expect(jsonStringifyAsync(value)).resolves.toBe(JSON.stringify(value));
  });

  it('rejects circular structures at any depth', async () => {
    const circularObject: {self?: unknown} = {};
    circularObject.self = circularObject;
    const circularArray: unknown[] = [];
    circularArray.push(circularArray);
    const circularError = {message: 'Circular Structure Detected'};

    await Promise.all([
      expect(jsonStringifyAsync(circularObject)).rejects.toMatchObject(circularError),
      expect(jsonStringifyAsync([{nested: circularObject}])).rejects.toMatchObject(circularError),
      expect(jsonStringifyAsync(circularArray)).rejects.toMatchObject(circularError),
      expect(
        jsonStringifyAsync({nested: circularObject}, ['nested', 'self']),
      ).rejects.toMatchObject(circularError),
    ]);
  });
});
