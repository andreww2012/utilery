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
});
