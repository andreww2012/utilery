import {pick} from '../../src/object/pick.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/pick', () => {
  it('picks top-level keys', () => {
    expect(pick({a: 1, b: 2, c: 3}, ['a', 'c'])).toStrictEqual({a: 1, c: 3});
  });

  it('picks deep path strings', () => {
    expect(pick({a: {b: 1, c: 2}}, ['a.b'])).toStrictEqual({a: {b: 1}});
  });

  it('picks by a predicate', () => {
    expect(pick({a: 1, b: 'keep', c: 3}, (value) => typeof value === 'string')).toStrictEqual({
      b: 'keep',
    });
  });

  it.each([
    [
      'keys',
      (input: Record<string, unknown>): Record<string, unknown> => pick(input, ['__proto__', 'a']),
    ],
    [
      'a predicate',
      (input: Record<string, unknown>): Record<string, unknown> => pick(input, () => true),
    ],
  ] as const)(
    'keeps an own __proto__ key from replacing the prototype of the result (%s)',
    (_, pickFrom) => {
      const result = pickFrom(parseUntrusted());

      expectOwnProtoKey(result);

      expect(result.a).toBe(1);
    },
  );
});
