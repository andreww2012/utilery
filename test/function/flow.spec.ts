import {flow} from '../../src/function/flow.ts';

const addOne = (value: number) => value + 1;
const timesTwo = (value: number) => value * 2;
const toLabel = (value: number) => `result: ${value}`;
const add2 = (a: number, b: number) => a + b;
const timesTen = (value: number) => value * 10;
const tripleNumber = (value: number) => value * 3;

describe('function/flow', () => {
  describe('left-to-right (pipe)', () => {
    it('threads the result through every function in order', () => {
      const piped = flow([addOne, timesTwo, toLabel]);

      expect(piped(3)).toBe('result: 8');
    });

    it('passes the original call arguments to the first function only', () => {
      const sum = flow([add2, timesTen]);

      expect(sum(2, 3)).toBe(50);
    });

    it('treats a `false` direction flag the same as the default', () => {
      // eslint-disable-next-line unicorn/no-unnecessary-default-arguments -- The default is passed on purpose
      const piped = flow([addOne, timesTwo], false);

      expect(piped(3)).toBe(8);
    });

    it('returns the original function untouched when only one is supplied', () => {
      const single = flow([tripleNumber]);

      expect(single(4)).toBe(12);
    });
  });

  describe('right-to-left (compose)', () => {
    it('runs functions in reverse declaration order', () => {
      const composed = flow([toLabel, timesTwo, addOne], true);

      expect(composed(3)).toBe('result: 8');
    });

    it('matches pipe with a reversed list', () => {
      const functions = [addOne, timesTwo];

      expect(flow(functions)(3)).toBe(flow(functions.toReversed(), true)(3));
    });
  });
});
