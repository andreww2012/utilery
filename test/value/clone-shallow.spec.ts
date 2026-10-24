import {isArray} from '../../src/predicate/is-array.ts';
import {cloneShallow} from '../../src/value/clone-shallow.ts';

describe('value/cloneShallow', () => {
  it('shallow clones, sharing nested references', () => {
    const source = {a: 1, b: {c: 2}};
    const cloned = cloneShallow(source);

    expect(cloned).toStrictEqual(source);
    expect(cloned).not.toBe(source);
    expect(cloned.b).toBe(source.b);
  });

  it('applies a customizer invoked for the root value', () => {
    const cloned = cloneShallow([1, 2, 3], (value) =>
      isArray(value)
        ? value.map(
            (item) =>
              // eslint-disable-next-line ts/no-explicit-any
              (item as any) * 2,
          )
        : undefined,
    );

    expect(cloned).toStrictEqual([2, 4, 6]);
  });
});
