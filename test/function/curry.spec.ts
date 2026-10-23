import {curry} from '../../src/function/curry.ts';

const add2 = (a: number, b: number) => a + b;
const sum3 = (a: number, b: number, c: number) => a + b + c;
const subtract3 = (a: number, b: number, c: number) => a - b - c;
const subtract2 = (a: number, b: number) => a - b;
const greetNullary = () => 'hi';
const double = (value: number) => value * 2;
const concat2 = (a: string, b: string) => `${a}|${b}`;

describe('function/curry', () => {
  describe('left-to-right (default)', () => {
    it('curries a binary function', () => {
      const curried = curry(add2);

      expect(curried(2)(3)).toBe(5);
    });

    it('curries a ternary function', () => {
      const curried = curry(sum3);

      expect(curried(1)(2)(3)).toBe(6);
    });

    it('treats fromRight=false the same as the default', () => {
      // eslint-disable-next-line unicorn/no-unnecessary-default-arguments -- The default is passed on purpose
      expect(curry(subtract2, false)(10)(3)).toBe(7);
    });

    it('returns a callable thunk for nullary functions', () => {
      expect(curry(greetNullary)()).toBe('hi');
    });

    it('returns the original function untouched for unary functions', () => {
      const curried = curry(double);

      expect(curried(4)).toBe(8);
    });
  });

  describe('right-to-left (fromRight = true)', () => {
    it('collects arguments from the rightmost parameter inward', () => {
      const curried = curry(subtract3, true);

      expect(curried(1)(2)(3)).toBe(3 - 2 - 1);
    });

    it('produces the same result as the left version for commutative ops', () => {
      expect(curry(sum3, true)(1)(2)(3)).toBe(curry(sum3)(3)(2)(1));
    });

    it('handles binary functions', () => {
      const curriedRight = curry(concat2, true);

      expect(curriedRight('first')('second')).toBe('second|first');
    });
  });
});
