import {mapRange} from '../../src/math/map-range.ts';

describe('math/mapRange', () => {
  it('maps a value preserving its relative position', () => {
    expect(mapRange(5, [0, 10], [0, 100])).toBe(50);
    expect(mapRange(2, [0, 4], [10, 20])).toBe(15);
  });

  it('supports inverted and offset ranges', () => {
    expect(mapRange(0, [-1, 1], [0, 255])).toBe(127.5);
    expect(mapRange(5, [0, 10], [100, 0])).toBe(50);
  });

  it('maps the end of the input range to exactly the end of the output range', () => {
    expect(mapRange(10, [0, 10], [1e20, 1])).toBe(1);
  });

  it('extrapolates beyond the output range by default', () => {
    expect(mapRange(15, [0, 10], [0, 100])).toBe(150);
  });

  it('clamps the result to the output range when clamp is true', () => {
    expect(mapRange(15, [0, 10], [0, 100], true)).toBe(100);
    expect(mapRange(-5, [0, 10], [0, 100], true)).toBe(0);
  });
});
