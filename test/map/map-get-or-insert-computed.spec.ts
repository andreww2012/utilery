import {mapGetOrInsertComputed} from '../../src/map/map-get-or-insert-computed.ts';
import {describeWithAndWithoutNative} from '../describe-with-and-without-native.ts';

describe('map/mapGetOrInsertComputed', () => {
  describeWithAndWithoutNative(
    Map.prototype,
    'getOrInsertComputed',
    function (
      this: Map<unknown, unknown>,
      key: unknown,
      computeDefaultValue: (key: unknown) => unknown,
    ) {
      if (Map.prototype.has.call(this, key)) {
        return Map.prototype.get.call(this, key);
      }

      const defaultValue = computeDefaultValue(key);
      Map.prototype.set.call(this, key, defaultValue);

      return defaultValue;
    },
    () => {
      it('inserts and returns the computed value when the key is missing', () => {
        const sample = new Map<string, number>();

        expect(mapGetOrInsertComputed(sample, 'a', () => 1)).toBe(1);
        expect(sample).toStrictEqual(new Map([['a', 1]]));
      });

      it('passes the key to the factory', () => {
        const computeDefaultValue = vi.fn<(key: string) => number>((key) => key.length);

        expect(mapGetOrInsertComputed(new Map<string, number>(), 'abc', computeDefaultValue)).toBe(
          3,
        );
        expect(computeDefaultValue).toHaveBeenCalledExactlyOnceWith('abc');
      });

      it('does not call the factory when the key is present', () => {
        const computeDefaultValue = vi.fn<() => number>(() => 99);

        expect(mapGetOrInsertComputed(new Map([['a', 1]]), 'a', computeDefaultValue)).toBe(1);
        expect(computeDefaultValue).not.toHaveBeenCalled();
      });

      it('treats a stored `undefined` as present', () => {
        const sample = new Map<string, number | undefined>([['a', undefined]]);
        const computeDefaultValue = vi.fn<() => number>(() => 42);

        expect(mapGetOrInsertComputed(sample, 'a', computeDefaultValue)).toBeUndefined();
        expect(computeDefaultValue).not.toHaveBeenCalled();
      });

      it('computes a fresh value per missing key', () => {
        const sample = new Map<string, number[]>();

        mapGetOrInsertComputed(sample, 'a', () => []).push(1);
        mapGetOrInsertComputed(sample, 'b', () => []).push(2);
        mapGetOrInsertComputed(sample, 'a', () => []).push(3);

        expect(sample).toStrictEqual(
          new Map([
            ['a', [1, 3]],
            ['b', [2]],
          ]),
        );
      });

      it('stores the computed value even if the factory inserts the key itself', () => {
        const sample = new Map<string, string>();

        expect(
          mapGetOrInsertComputed(sample, 'a', (key) => {
            sample.set(key, 'inner');
            return 'outer';
          }),
        ).toBe('outer');
        expect(sample.get('a')).toBe('outer');
      });
    },
  );
});
