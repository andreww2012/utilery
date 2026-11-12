import {isEqual} from '../../src/value/is-equal.ts';

describe('value/isEqual', () => {
  describe('without a customizer', () => {
    it('compares primitives by value', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual('a', 'a')).toBe(true);
      expect(isEqual(1, 2)).toBe(false);
    });

    it('compares plain objects deeply', () => {
      expect(isEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})).toBe(true);
      expect(isEqual({a: 1}, {a: 2})).toBe(false);
    });

    it('compares arrays deeply', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('compares built-in types', () => {
      expect(isEqual(new Date('2026-01-01'), new Date('2026-01-01'))).toBe(true);
      expect(isEqual(/abc/g, /abc/g)).toBe(true);
    });
  });

  describe('with a customizer', () => {
    it('uses the customizer return value when defined', () => {
      const areEqual = isEqual('Hello', 'hello', (x, y) =>
        typeof x === 'string' && typeof y === 'string'
          ? x.toLowerCase() === y.toLowerCase()
          : undefined,
      );

      expect(areEqual).toBe(true);
    });

    it('falls back to the default strategy when the customizer returns undefined', () => {
      const areEqual = isEqual({a: 1}, {a: 1}, () => undefined);

      expect(areEqual).toBe(true);
    });

    it('uses the customizer to override an otherwise-equal comparison', () => {
      const areEqual = isEqual({a: 1}, {a: 1}, () => false);

      expect(areEqual).toBe(false);
    });
  });

  it('accepts a customizer that may be `undefined`', () => {
    [undefined, () => undefined].forEach((customizer) => {
      expect(isEqual({a: 1}, {a: 1}, customizer)).toBe(true);
    });
  });
});
