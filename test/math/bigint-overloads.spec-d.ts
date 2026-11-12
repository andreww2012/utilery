import {maxBy} from '../../src/array/max-by.ts';
import {clamp} from '../../src/math/clamp.ts';
import {max} from '../../src/math/max.ts';
import {range} from '../../src/math/range.ts';

describe('math bigint overloads', () => {
  it('returns bigints for bigint input', () => {
    expectTypeOf(clamp(1n, 2n, 3n)).toEqualTypeOf<bigint>();
    expectTypeOf(range(3n)).toEqualTypeOf<bigint[]>();
    expectTypeOf(max([1n, 2n])).toEqualTypeOf<bigint | undefined>();
    expectTypeOf(maxBy([{id: 1n}] as const, (item) => item.id)).toEqualTypeOf<{readonly id: 1n}>();
  });

  it('rejects mixed numbers and bigints', () => {
    // @ts-expect-error mixed types
    clamp(1n, 2, 3n);
    // @ts-expect-error mixed types
    range(1, 3n);
  });
});
