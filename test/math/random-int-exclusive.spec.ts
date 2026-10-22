import {randomIntExclusive} from '../../src/math/random-int-exclusive.ts';

describe('math/randomIntExclusive', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an integer within the exclusive two-argument range', () => {
    for (let run = 0; run < 1000; run += 1) {
      const result = randomIntExclusive(1, 4);

      expect(Number.isSafeInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(4);
    }
  });

  it('includes the lower bound but excludes the upper bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomIntExclusive(1, 4)).toBe(1);

    vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomIntExclusive(1, 4)).toBe(3);
  });

  it('treats a single argument as the exclusive range [0, maximum)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(randomIntExclusive(3)).toBe(0);

    vi.spyOn(Math, 'random').mockReturnValue(0.999999);

    expect(randomIntExclusive(3)).toBe(2);
  });

  it('uses the given generator', () => {
    expect(randomIntExclusive(1, 4, {random: () => 0.999})).toBe(3);
    expect(randomIntExclusive(3, {random: () => 0})).toBe(0);
  });
});
