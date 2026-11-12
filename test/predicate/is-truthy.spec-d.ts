import {isTruthy} from '../../src/predicate/is-truthy.ts';

describe('predicate/isTruthy', () => {
  it('narrows the element type when used as a filter predicate', () => {
    const values: (number | null | undefined)[] = [1, null, 2, undefined, 0];
    // Assignable to `number[]` only if `isTruthy` subtracts `null`/`undefined`
    const numbers: number[] = values.filter(isTruthy);

    expect(numbers).toStrictEqual([1, 2]);
  });

  it('removes falsy literals from a union', () => {
    const flag = 1 as 0 | 1;

    if (!isTruthy(flag)) {
      return;
    }

    // Assignable to `1` only if `isTruthy` subtracts the `0` member
    const one: 1 = flag;

    expect(one).toBe(1);
  });

  it('narrows an `unknown` value to the truthy types and keeps it `unknown` otherwise', () => {
    const value: unknown = 1;

    if (isTruthy(value)) {
      expectTypeOf(value).toEqualTypeOf<string | number | bigint | true | symbol | object>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }

    const values: unknown[] = [0, 'a', null];

    expectTypeOf(values.filter(isTruthy)).toEqualTypeOf<
      (string | number | bigint | true | symbol | object)[]
    >();
  });

  it('keeps `any` as it is', () => {
    // eslint-disable-next-line ts/no-explicit-any -- the type under test
    const value: any = 1;

    if (isTruthy(value)) {
      expectTypeOf(value).toBeAny();
    }
  });

  it('drops wide `string`, `number` and `bigint` types when it returns `false`', () => {
    const name = '' as string;

    // eslint-disable-next-line ts/no-unnecessary-condition -- the documented `false` branch
    if (!isTruthy(name)) {
      expectTypeOf(name).toBeNever();
    }

    const value = '' as string | undefined;
    if (!isTruthy(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
