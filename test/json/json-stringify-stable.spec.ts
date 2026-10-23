import {jsonStringifyStable} from '../../src/json/json-stringify-stable.ts';

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
});
