import {serializeStable} from '../../src/value/serialize-stable.ts';

describe('value/serializeStable', () => {
  it('does not depend on the order of object keys, Map keys and Set values', () => {
    expect(serializeStable({b: 2, a: 1})).toBe(serializeStable({a: 1, b: 2}));
    expect(
      serializeStable(
        new Map([
          ['b', 1],
          ['a', 2],
        ]),
      ),
    ).toBe(
      serializeStable(
        new Map([
          ['a', 2],
          ['b', 1],
        ]),
      ),
    );
    expect(serializeStable(new Set([3, 1, 2]))).toBe('Set[1,2,3]');
  });

  it('keeps the order of array elements', () => {
    expect(serializeStable([1, 2])).not.toBe(serializeStable([2, 1]));
  });

  it('tells apart values of different types', () => {
    const values = [
      1,
      '1',
      1n,
      true,
      'true',
      null,
      undefined,
      'undefined',
      [],
      {},
      new Set(),
      new Map(),
    ];

    expect(new Set(values.map(serializeStable)).size).toBe(values.length);
  });

  it('tells apart strings that contain quotes and backslashes', () => {
    expect(serializeStable(["a','b"])).not.toBe(serializeStable(['a', 'b']));
    expect(serializeStable({"a':'1','b": '2'})).not.toBe(serializeStable({a: '1', b: '2'}));
    // A backslash at the end must not turn the closing quote into an escaped one
    expect(serializeStable(['a\\'])).not.toBe(serializeStable(["a'"]));
  });

  it('writes nested and special values', () => {
    expect(
      serializeStable(
        new Map<string, unknown>([
          ['b', [1, 2n]],
          ['a', new Set([3, 1])],
        ]),
      ),
    ).toBe("Map{'a':Set[1,3],'b':[1,2n]}");
    expect(serializeStable(new Date(0))).toBe("Date('1970-01-01T00:00:00.000Z')");
    expect(serializeStable(/a/g)).toBe('RegExp(/a/g)');
    expect(serializeStable(new Error('x'))).toBe("Error(Error: 'x')");
  });

  it('writes repeated and circular references as back-references', () => {
    const node: Record<string, unknown> = {name: 'root'};
    node.self = node;

    expect(serializeStable(node)).toBe("{'name':'root','self':#ref0}");
  });

  it('handles Unicode strings', () => {
    expect(serializeStable({日本: '😀'})).toBe("{'日本':'😀'}");
  });

  it('throws a TypeError for objects that cannot be serialized', () => {
    expect(() => serializeStable({promise: Promise.resolve()})).toThrow(TypeError);
    expect(() => serializeStable(new WeakMap())).toThrow(TypeError);
  });
});
