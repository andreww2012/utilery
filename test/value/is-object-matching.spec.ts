import {isObjectMatching} from '../../src/value/is-object-matching.ts';

describe('value/isObjectMatching', () => {
  it('matches a deep partial pattern, ignoring extra keys', () => {
    expect(isObjectMatching({a: 1, b: {c: 2, d: 3}}, {b: {c: 2}})).toBe(true);
  });

  it('fails when a value differs', () => {
    expect(isObjectMatching({a: 1}, {a: 2})).toBe(false);
  });

  it('applies a customizer, falling back to the default on undefined', () => {
    const isMatching = isObjectMatching(
      {name: 'Ann', age: 30},
      {name: 'ANN', age: 30},
      (value, other) =>
        typeof value === 'string' && typeof other === 'string'
          ? value.toLowerCase() === other.toLowerCase()
          : undefined,
    );

    expect(isMatching).toBe(true);
  });

  it('accepts a customizer that may be `undefined`', () => {
    [undefined, () => undefined].forEach((customizer) => {
      expect(isObjectMatching({a: 1, b: 2}, {a: 1}, customizer)).toBe(true);
    });
  });
});
