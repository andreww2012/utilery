import {isEqualShallow} from '../../src/value/is-equal-shallow.ts';

describe('value/isEqualShallow', () => {
  it('narrows the first value to the second when used as a guard', () => {
    const value = {kind: 'a'} as {kind: 'a'} | {kind: 'b'};

    if (isEqualShallow(value, {kind: 'a'} as const)) {
      expectTypeOf(value).toEqualTypeOf<{kind: 'a'}>();
    }
  });

  it('narrows with one argument when the types are given', () => {
    const modes: ('a' | 'b')[] = ['a', 'b'];

    expectTypeOf(modes.filter(isEqualShallow<'a' | 'b', 'a'>('a'))).toEqualTypeOf<'a'[]>();
  });
});
