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
});
