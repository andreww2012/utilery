import {reduce} from '../../src/iterable/reduce.ts';

function* oneToThree(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const failOnTwo = (acc: number, value: number) => {
  if (value === 2) {
    throw new Error('failed');
  }

  return acc + value;
};

describe('iterable/reduce', () => {
  describe('with an initial value', () => {
    it('reduces with the provided initial accumulator', () => {
      expect(reduce([1, 2, 3], (acc, value) => acc + value, 0)).toBe(6);
    });

    it('returns the initial value for an empty iterable', () => {
      expect(reduce([] as number[], (acc, value) => acc + value, 42)).toBe(42);
    });

    it('supports a different accumulator type than the element type', () => {
      const result = reduce(
        ['a', 'bb', 'ccc'],
        (acc, value) => acc.set(value, value.length),
        new Map<string, number>(),
      );

      expect([...result]).toStrictEqual([
        ['a', 1],
        ['bb', 2],
        ['ccc', 3],
      ]);
    });

    it('passes the running accumulator on each step', () => {
      const calls: {acc: string; value: number}[] = [];

      reduce(
        [1, 2, 3],
        (acc, value) => {
          calls.push({acc, value});
          return `${acc}${value}`;
        },
        'start:',
      );

      expect(calls).toStrictEqual([
        {acc: 'start:', value: 1},
        {acc: 'start:1', value: 2},
        {acc: 'start:12', value: 3},
      ]);
    });
  });

  describe('without an initial value', () => {
    it('uses the first element as the starting accumulator', () => {
      expect(reduce([10, 20, 30], (acc, value) => acc + value)).toBe(60);
    });

    it('returns the only element when the iterable has length 1', () => {
      expect(reduce([7], (acc, value) => acc + value)).toBe(7);
    });

    it('throws TypeError on an empty iterable', () => {
      expect(() => reduce([] as number[], (acc, value) => acc + value)).toThrow(TypeError);
    });

    it('works on generators', () => {
      expect(reduce(oneToThree(), (acc, value) => acc * value)).toBe(6);
    });
  });

  it.each([false, true])(
    'closes the iterator when the reducer throws (initial value: %s)',
    (hasInitialValue) => {
      let isClosed = false;
      function* generate() {
        try {
          yield* [1, 2, 3];
        } finally {
          isClosed = true;
        }
      }

      expect(() =>
        hasInitialValue ? reduce(generate(), failOnTwo, 0) : reduce(generate(), failOnTwo),
      ).toThrow('failed');
      expect(isClosed).toBe(true);
    },
  );
});
