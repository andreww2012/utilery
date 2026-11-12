import {isPropertyDefined} from '../../src/predicate/is-property-defined.ts';

class Counter {
  readonly #count = 0;

  get count(): number {
    return this.#count;
  }
}

describe('predicate/isPropertyDefined', () => {
  it('narrows the property in callbacks', () => {
    const items: {name: string; value: number | undefined}[] = [
      {name: 'a', value: 1},
      {name: 'b', value: undefined},
    ];

    expectTypeOf(items.filter(isPropertyDefined('value')))
      .items.toHaveProperty('value')
      .toEqualTypeOf<number>();
  });

  it('narrows an object whose type already has the property to `never` when it returns `false`', () => {
    const counter = new Counter();

    // eslint-disable-next-line ts/no-unnecessary-condition -- the documented `false` branch
    if (!isPropertyDefined('count')(counter)) {
      expectTypeOf(counter).toBeNever();
    }

    const item = {name: 'a'};
    const key = 'name' as string;
    // eslint-disable-next-line ts/no-unnecessary-condition -- the documented `false` branch
    if (!isPropertyDefined(key)(item)) {
      expectTypeOf(item).toBeNever();
    }
  });

  it('drops the union members whose type already has the property when it returns `false`', () => {
    const counter = undefined as Counter | undefined;

    if (!isPropertyDefined('count')(counter)) {
      expectTypeOf(counter).toEqualTypeOf<undefined>();
    }
  });
});
