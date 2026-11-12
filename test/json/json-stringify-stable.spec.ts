import {jsonStringifyStable} from '../../src/json/json-stringify-stable.ts';
import {EXPLICIT_UNDEFINED} from '../exact-optional-property-types.ts';

describe('json/jsonStringifyStable', () => {
  it('basic test', () => {
    expect(jsonStringifyStable({b: 1, a: 2})).toBe('{"a":2,"b":1}');
  });

  it('replaces circular references with the depth of the referenced ancestor', () => {
    const items: unknown[] = [1];
    const value = {items, self: {}};
    items.push(items);
    value.self = value;

    expect(jsonStringifyStable(value)).toBe('{"items":[1,"[Circular: 1]"],"self":"[Circular: 0]"}');
  });

  it('supports bigints', () => {
    expect(jsonStringifyStable({value: 12_345_678_901_234_567_890n})).toBe(
      '{"value":12345678901234567890}',
    );
  });

  it('throws a `TypeError` on a circular reference when `circularValue` is `Error` or `TypeError`', () => {
    const value: Record<string, unknown> = {};
    value.self = value;

    expect(() => jsonStringifyStable.configure({circularValue: Error})(value)).toThrow(TypeError);
    expect(() => jsonStringifyStable.configure({circularValue: TypeError})(value)).toThrow(
      TypeError,
    );
  });

  it('writes `null` for a circular reference when `circularValue` is `null`', () => {
    const value: Record<string, unknown> = {};
    value.self = value;

    expect(jsonStringifyStable.configure({circularValue: null})(value)).toBe('{"self":null}');
  });

  it('leaves out a circular reference when `circularValue` is `undefined`, or writes `null` in an array', () => {
    const object: Record<string, unknown> = {a: 1};
    object.self = object;
    const array: unknown[] = [1];
    array.push(array);
    const stringify = jsonStringifyStable.configure({circularValue: undefined});

    expect(stringify(object)).toBe('{"a":1}');
    expect(stringify(array)).toBe('[1,null]');
  });

  it('treats options set to `undefined` like missing ones', () => {
    const stringify = jsonStringifyStable.configure({
      bigint: EXPLICIT_UNDEFINED,
      deterministic: EXPLICIT_UNDEFINED,
      maximumBreadth: EXPLICIT_UNDEFINED,
      maximumDepth: EXPLICIT_UNDEFINED,
      strict: EXPLICIT_UNDEFINED,
      safe: EXPLICIT_UNDEFINED,
    });

    expect(stringify({b: 1n, a: [1, 2]})).toBe('{"a":[1,2],"b":1}');
  });

  it('leaves out the elements of a bigint typed array when `bigint` is `false`', () => {
    const stringify = jsonStringifyStable.configure({bigint: false});

    expect(stringify({ids: new BigInt64Array([1n, 2n]), count: 2})).toBe('{"count":2,"ids":{}}');
    expect(stringify(new BigUint64Array([1n]), null, 2)).toBe('{}');
    expect(jsonStringifyStable({ids: new BigInt64Array([1n, 2n])})).toBe('{"ids":{"0":1,"1":2}}');
  });

  it('throws for a bigint typed array with `strict`, unless `bigint` is set', () => {
    const ids = new BigInt64Array([1n, 2n]);

    expect(() => jsonStringifyStable.configure({strict: true})(ids)).toThrow(Error);
    expect(jsonStringifyStable.configure({strict: true, bigint: true})(ids)).toBe('{"0":1,"1":2}');
  });

  it('writes the error message per element of a typed array with `strict` and `safe`', () => {
    const stringify = jsonStringifyStable.configure({strict: true, safe: true});

    expect(stringify(new Float64Array([1, Number.NaN]))).toMatch(
      /^\{"0":1,"1":"Error: .+NaN.+"\}$/,
    );
    expect(stringify(new BigInt64Array([1n]))).toMatch(/^\{"0":"Error: .+bigint.+"\}$/);
  });

  it('escapes the error message of a throwing getter with `safe`', () => {
    const value = {
      get name(): string {
        throw new Error('a "quoted" word');
      },
    };

    expect(JSON.parse(jsonStringifyStable.configure({safe: true})(value))).toContain(
      'a "quoted" word',
    );
  });
});
