import {cartesianProduct} from '../../src/array/cartesian-product.ts';

describe('array/cartesianProduct', () => {
  it('basic test', () => {
    const result = cartesianProduct([1, 2], ['a', 'b']);

    expect(result).toStrictEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });
});
