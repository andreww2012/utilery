import {setByPathImmutable} from '../../src/object/set-by-path-immutable.ts';

describe('object/setByPathImmutable', () => {
  it('preserves the object type', () => {
    expectTypeOf(setByPathImmutable({a: {b: 1}}, ['a', 'b'], 2)).toEqualTypeOf<{a: {b: number}}>();
  });

  it('rejects a value of the wrong type at the path', () => {
    // @ts-expect-error `'a.b'` is a number, not a string
    setByPathImmutable({a: {b: 1}}, ['a', 'b'], 'wrong');
  });

  it('rejects a path that does not exist in the type', () => {
    // @ts-expect-error `['a', 'z']` is not a valid path
    setByPathImmutable({a: {b: 1}}, ['a', 'z'], 2);
  });
});
