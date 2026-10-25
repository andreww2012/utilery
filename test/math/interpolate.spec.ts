import {interpolate} from '../../src/math/interpolate.ts';

describe('math/interpolate', () => {
  it('returns the endpoints for factors 0 and 1', () => {
    expect(interpolate(0, 10, 0)).toBe(0);
    expect(interpolate(0, 10, 1)).toBe(10);
  });

  it('returns exactly max for factor 1 despite rounding errors', () => {
    expect(interpolate(-85.96410605924758, 44.57091646118337, 1)).toBe(44.57091646118337);
    expect(interpolate(1e20, 1, 1)).toBe(1);
    expect(interpolate(1e20, 1, 2, true)).toBe(1);
  });

  it('returns the midpoint for factor 0.5', () => {
    expect(interpolate(0, 10, 0.5)).toBe(5);
    expect(interpolate(20, 40, 0.5)).toBe(30);
  });

  it('extrapolates beyond the endpoints by default', () => {
    expect(interpolate(0, 10, 1.5)).toBe(15);
    expect(interpolate(0, 10, -0.5)).toBe(-5);
  });

  it('clamps the factor to [0, 1] when clamp is true', () => {
    expect(interpolate(0, 10, 1.5, true)).toBe(10);
    expect(interpolate(0, 10, -0.5, true)).toBe(0);
  });

  it('does not alter in-range factors when clamp is true', () => {
    expect(interpolate(0, 10, 0.25, true)).toBe(2.5);
  });
});
