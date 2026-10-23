import {mapGetOrInsert} from '../../src/map/map-get-or-insert.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';

describe('map/mapGetOrInsert', () => {
  describeWithAndWithoutNative(
    Map.prototype,
    'getOrInsert',
    function (this: Map<unknown, unknown>, key: unknown, defaultValue: unknown) {
      if (!Map.prototype.has.call(this, key)) {
        Map.prototype.set.call(this, key, defaultValue);
      }

      return Map.prototype.get.call(this, key);
    },
    () => {
      it('inserts and returns the default value when the key is missing', () => {
        const sample = new Map<string, number>();

        expect(mapGetOrInsert(sample, 'a', 1)).toBe(1);
        expect(sample).toStrictEqual(new Map([['a', 1]]));
      });

      it('returns the existing value without overwriting it', () => {
        const sample = new Map([['a', 1]]);

        expect(mapGetOrInsert(sample, 'a', 99)).toBe(1);
        expect(sample).toStrictEqual(new Map([['a', 1]]));
      });

      it('treats a stored `undefined` as present', () => {
        const sample = new Map<string, number | undefined>([['a', undefined]]);

        expect(mapGetOrInsert(sample, 'a', 42)).toBeUndefined();
        expect(sample.get('a')).toBeUndefined();
      });

      it('returns the very same reference on subsequent calls', () => {
        const sample = new Map<string, number[]>();
        const inserted = mapGetOrInsert(sample, 'a', []);

        inserted.push(1);

        expect(mapGetOrInsert(sample, 'a', [])).toBe(inserted);
        expect(sample.get('a')).toStrictEqual([1]);
      });

      it('uses SameValueZero key equality, like `Map` itself', () => {
        const sample = new Map<number, string>([[Number.NaN, 'nan']]);

        expect(mapGetOrInsert(sample, Number.NaN, 'other')).toBe('nan');
        expect(mapGetOrInsert(sample, -0, 'zero')).toBe('zero');
        expect(mapGetOrInsert(sample, 0, 'other')).toBe('zero');
      });
    },
  );

  it('calls the `getOrInsert` method of the map when it has one', () => {
    class LoggingMap<K, V> extends Map<K, V> {
      readonly calls: unknown[][] = [];

      getOrInsert(key: K, defaultValue: V) {
        this.calls.push([key, defaultValue]);
        return defaultValue;
      }
    }
    const sample = new LoggingMap<string, number>();

    expect(mapGetOrInsert(sample, 'a', 1)).toBe(1);
    expect(sample.calls).toStrictEqual([['a', 1]]);
  });
});
