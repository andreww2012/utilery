import {isIncludedIn} from '../../src/predicate/is-included-in.ts';

describe('predicate/isIncludedIn', () => {
  type Animal = 'cat' | 'dog' | 'mouse';
  it('narrows both branches for a tuple of literals', () => {
    const value = 'cat' as Animal;

    if (isIncludedIn(value, ['cat', 'dog'] as const)) {
      expectTypeOf(value).toEqualTypeOf<'cat' | 'dog'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<'mouse'>();
    }
  });

  it('narrows a value whose type the element type does not cover', () => {
    const value = 'cat' as string;
    const pets = ['cat'] as ('cat' | 'dog')[];

    if (isIncludedIn(value, pets)) {
      expectTypeOf(value).toEqualTypeOf<'cat' | 'dog'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<string>();
    }

    const data = 'cat' as unknown;
    const names = ['cat'] as string[];
    if (isIncludedIn(data, names)) {
      expectTypeOf(data).toEqualTypeOf<string>();
    } else {
      expectTypeOf(data).toEqualTypeOf<unknown>();
    }
  });

  it('does not narrow when the array may not hold every covered value', () => {
    const value = 'cat' as Animal;
    const pets = ['cat'] as ('cat' | 'dog')[];

    expectTypeOf(isIncludedIn(value, pets)).toEqualTypeOf<boolean>();

    const mixed = 'cat' as 'cat' | number;
    const cats = ['cat'] as 'cat'[];
    expectTypeOf(isIncludedIn(mixed, cats)).toEqualTypeOf<boolean>();
  });

  it('narrows the element type in callbacks', () => {
    const names = ['cat', 'mouse'];

    expectTypeOf(names.filter(isIncludedIn(['cat', 'dog'] as const))).toEqualTypeOf<
      ('cat' | 'dog')[]
    >();
  });

  it('drops the covered union members of a direct argument when the guard returns `false`', () => {
    const animal = 'cat' as Animal;
    const pets = ['cat'] as readonly ('cat' | 'dog')[];

    if (!isIncludedIn(pets)(animal)) {
      expectTypeOf(animal).toEqualTypeOf<'mouse'>();
    }
  });
});
