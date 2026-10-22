import {createSeededRandom} from '../../src/math/create-seeded-random.ts';

const take = (random: () => number, count: number) => Array.from({length: count}, () => random());

describe('math/createSeededRandom', () => {
  it('gives the same sequence for the same seed', () => {
    expect(take(createSeededRandom(42), 5)).toStrictEqual(take(createSeededRandom(42), 5));
    expect(take(createSeededRandom('day'), 5)).toStrictEqual(take(createSeededRandom('day'), 5));
  });

  it('gives different sequences for different seeds', () => {
    expect(take(createSeededRandom(1), 3)).not.toStrictEqual(take(createSeededRandom(2), 3));
    expect(take(createSeededRandom('a'), 3)).not.toStrictEqual(take(createSeededRandom('b'), 3));
  });

  it('returns numbers from 0 to 1, spread evenly', () => {
    const numbers = take(createSeededRandom(7), 10_000);

    numbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThan(1);
    });

    expect(numbers.reduce((sum, number) => sum + number, 0) / numbers.length).toBeCloseTo(0.5, 1);
  });

  it('is stable across versions', () => {
    expect(take(createSeededRandom(42), 2)).toMatchInlineSnapshot(
      '[0.6011037519201636, 0.44829055899754167]',
    );
  });
});
