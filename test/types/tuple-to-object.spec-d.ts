import type {TupleToObject} from '../../src/types/tuple-to-object.ts';

describe('types/TupleToObject', () => {
  it('basic test', () => {
    expectTypeOf<TupleToObject<['a', 'b']>>().toEqualTypeOf<{0: 'a'; 1: 'b'}>();
  });

  it('gives optional keys for optional elements', () => {
    expectTypeOf<TupleToObject<[number, string?]>>().toEqualTypeOf<{0: number; 1?: string}>();
  });

  it('gives readonly keys for a readonly tuple', () => {
    expectTypeOf<TupleToObject<readonly [number, number]>>().toEqualTypeOf<{
      readonly 0: number;
      readonly 1: number;
    }>();
  });
});
