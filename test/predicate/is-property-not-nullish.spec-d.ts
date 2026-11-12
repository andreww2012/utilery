import {isPropertyNotNullish} from '../../src/predicate/is-property-not-nullish.ts';

class Counter {
  readonly #count = 0;

  get count(): number {
    return this.#count;
  }
}

describe('predicate/isPropertyNotNullish', () => {
  it('narrows the property in callbacks', () => {
    const items: {name: string; value: number | null | undefined}[] = [
      {name: 'a', value: 1},
      {name: 'b', value: undefined},
    ];

    expectTypeOf(items.filter(isPropertyNotNullish('value')))
      .items.toHaveProperty('value')
      .toEqualTypeOf<number>();
  });

  it('narrows an object whose type already has the property to `never` when it returns `false`', () => {
    const counter = new Counter();

    // eslint-disable-next-line ts/no-unnecessary-condition -- the documented `false` branch
    if (!isPropertyNotNullish('count')(counter)) {
      expectTypeOf(counter).toBeNever();
    }

    const item = {name: 'a'};
    const key = 'name' as string;
    // eslint-disable-next-line ts/no-unnecessary-condition -- the documented `false` branch
    if (!isPropertyNotNullish(key)(item)) {
      expectTypeOf(item).toBeNever();
    }
  });

  it('drops the union members whose type already has the property when it returns `false`', () => {
    const counter = undefined as Counter | undefined;

    if (!isPropertyNotNullish('count')(counter)) {
      expectTypeOf(counter).toEqualTypeOf<undefined>();
    }
  });
});
