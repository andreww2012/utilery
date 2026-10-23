import {partial} from '../../src/function/partial.ts';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const join3 = (a: string, b: string, c: string) => `${a}-${b}-${c}`;
const double = (value: number) => value * 2;

describe('function/partial', () => {
  describe('left partial (default)', () => {
    it('pre-applies a single leading argument', () => {
      const sayHi = partial(greet, ['Hi']);

      expect(sayHi('Alice')).toBe('Hi, Alice!');
    });

    it('pre-applies multiple leading arguments', () => {
      const prefixed = partial(join3, ['x', 'y']);

      expect(prefixed('z')).toBe('x-y-z');
    });

    it('treats fromRight=false the same as the default', () => {
      expect(partial(greet, ['Hello'], false)('Bob')).toBe('Hello, Bob!');
    });

    it('exposes a placeholder that defers a positional argument', () => {
      const skipFirst = partial(join3, [partial.placeholder, 'mid']);

      expect(skipFirst('start', 'end')).toBe('start-mid-end');
    });

    it('returns the original function when no arguments are pre-applied', () => {
      const wrapped = partial(double, []);

      expect(wrapped(3)).toBe(6);
    });
  });

  describe('right partial (fromRight = true)', () => {
    it('pre-applies trailing arguments', () => {
      const sayToAlice = partial(greet, ['Alice'], true);

      expect(sayToAlice('Hello')).toBe('Hello, Alice!');
    });

    it('pre-applies multiple trailing arguments', () => {
      const suffixed = partial(join3, ['y', 'z'], true);

      expect(suffixed('x')).toBe('x-y-z');
    });

    it('supports a placeholder to defer a trailing positional argument', () => {
      const skipMiddleFromRight = partial(join3, [partial.placeholder, 'z'], true);

      expect(skipMiddleFromRight('x', 'y')).toBe('x-y-z');
    });
  });
});
