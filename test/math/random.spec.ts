import {random} from '../../src/math/random.ts';

describe('math/random', () => {
  it('basic test', () => {
    const result = random(0, 5);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(5);
  });

  it('uses the given generator', () => {
    expect(random(10, 20, {random: () => 0.5})).toBe(15);
    expect(random(10, {random: () => 0.25})).toBe(2.5);
  });

  it('throws when the maximum is not greater than the minimum', () => {
    expect(() => random(5, 5)).toThrow(Error);
    expect(() => random(0)).toThrow(Error);
  });
});
