import {randomIntInclusive} from '../../src/math/random-int-inclusive.ts';

describe('math/randomIntInclusive', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an integer within the inclusive two-argument range', () => {
    for (let run = 0; run < 1000; run += 1) {
      const result = randomIntInclusive(2, 5);

      expect(Number.isSafeInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it('includes both bounds', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomIntInclusive(2, 5)).toBe(2);

    vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomIntInclusive(2, 5)).toBe(5);
  });

  it('treats a single argument as the inclusive range [0, maximum]', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomIntInclusive(3)).toBe(0);

    vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomIntInclusive(3)).toBe(3);
  });

  it('uses the given generator', () => {
    expect(randomIntInclusive(1, 6, {random: () => 0})).toBe(1);
    expect(randomIntInclusive(1, 6, {random: () => 0.999})).toBe(6);
    expect(randomIntInclusive(3, {random: () => 0.999})).toBe(3);
  });
});
