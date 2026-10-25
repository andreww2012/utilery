import {interpolateInverse} from '../../src/math/interpolate-inverse.ts';
import {interpolate} from '../../src/math/interpolate.ts';

describe('math/interpolateInverse', () => {
  it('returns 0 and 1 for the endpoints', () => {
    expect(interpolateInverse(10, 20, 10)).toBe(0);
    expect(interpolateInverse(10, 20, 20)).toBe(1);
  });

  it('returns the factor of a value inside the range', () => {
    expect(interpolateInverse(0, 200, 50)).toBe(0.25);
    expect(interpolateInverse(20, 40, 30)).toBe(0.5);
  });

  it('supports an inverted range', () => {
    expect(interpolateInverse(100, 0, 25)).toBe(0.75);
  });

  it('returns factors outside [0, 1] for values outside the range by default', () => {
    expect(interpolateInverse(10, 20, 25)).toBe(1.5);
    expect(interpolateInverse(10, 20, 5)).toBe(-0.5);
  });

  it('clamps the factor to [0, 1] when clamp is true', () => {
    expect(interpolateInverse(10, 20, 25, true)).toBe(1);
    expect(interpolateInverse(10, 20, 5, true)).toBe(0);
    expect(interpolateInverse(10, 20, 12.5, true)).toBe(0.25);
  });

  it('returns 0 for an empty range', () => {
    expect(interpolateInverse(5, 5, 5)).toBe(0);
    expect(interpolateInverse(5, 5, 100)).toBe(0);
  });

  it('reverses interpolate', () => {
    expect(interpolate(-3, 7, interpolateInverse(-3, 7, 4.5))).toBe(4.5);
  });
});
