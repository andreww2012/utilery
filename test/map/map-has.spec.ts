import {mapHas} from '../../src/map/map-has.ts';

describe('map/mapHas', () => {
  it('reports whether the map has the key', () => {
    const map = new Map<unknown, number>([
      ['a', 1],
      [Number.NaN, 2],
      ['你好', 3],
    ]);
    const key: unknown = 'a';

    expect(mapHas(map, key)).toBe(true);
    expect(mapHas(map, 'b')).toBe(false);
    expect(mapHas(map, Number.NaN)).toBe(true);
    expect(mapHas(map, '你好')).toBe(true);
    expect(mapHas(map, 1)).toBe(false);
  });

  it('does not treat `__proto__` and `constructor` as present keys', () => {
    const map = new Map<string, number>();

    expect(mapHas(map, '__proto__')).toBe(false);
    expect(mapHas(map, 'constructor')).toBe(false);
  });
});
