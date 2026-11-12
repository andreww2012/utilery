import {allUnionMembers} from '../../src/ts/all-union-members.ts';

describe('ts/allUnionMembers', () => {
  type Fruit = 'apple' | 'banana' | 'cherry';

  it('returns the given tuple unchanged', () => {
    const fruits = ['apple', 'banana', 'cherry'] as const;

    expect(allUnionMembers<Fruit>()(fruits)).toBe(fruits);
  });

  it('returns the given tuple unchanged when keeping it readonly', () => {
    const fruits = ['apple', 'banana', 'cherry'] as const;

    expect(allUnionMembers<Fruit, {readonly: true}>()(fruits)).toBe(fruits);
  });
});
