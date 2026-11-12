import {allUnionMembers} from '../../src/ts/all-union-members.ts';

type Fruit = 'apple' | 'banana' | 'cherry';

describe('ts/allUnionMembers', () => {
  it('accepts a tuple that lists every member exactly once', () => {
    expectTypeOf(allUnionMembers<Fruit>()(['apple', 'banana', 'cherry'])).toEqualTypeOf<
      ['apple', 'banana', 'cherry']
    >();
  });

  it('is order-independent', () => {
    expectTypeOf(allUnionMembers<Fruit>()(['cherry', 'apple', 'banana'])).toEqualTypeOf<
      ['cherry', 'apple', 'banana']
    >();
  });

  it('preserves the readonly tuple type on request', () => {
    expectTypeOf(
      allUnionMembers<Fruit, {readonly: true}>()(['apple', 'banana', 'cherry']),
    ).toEqualTypeOf<readonly ['apple', 'banana', 'cherry']>();
  });

  it('rejects a tuple missing a member', () => {
    // @ts-expect-error `'cherry'` is missing
    allUnionMembers<Fruit>()(['apple', 'banana']);
  });

  it('rejects a tuple with a duplicated member', () => {
    // @ts-expect-error `'apple'` is duplicated
    allUnionMembers<Fruit>()(['apple', 'banana', 'cherry', 'apple']);
  });

  it('rejects a tuple containing a value outside the union', () => {
    // @ts-expect-error `'date'` is not a member of `Fruit`
    allUnionMembers<Fruit>()(['apple', 'banana', 'cherry', 'date']);
  });

  it('cannot be satisfied by hand-crafting the error-message property', () => {
    allUnionMembers<Fruit>()(
      // @ts-expect-error the branded error value cannot be forged without a cast
      Object.assign(['apple', 'banana'], {
        'This array is missing these union members': 'cherry',
      }),
    );
  });
});
