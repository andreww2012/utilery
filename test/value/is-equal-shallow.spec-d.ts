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

  it('narrows both branches exactly for a literal', () => {
    const mode = 'a' as 'a' | 'b';

    if (isEqualShallow(mode, 'a')) {
      expectTypeOf(mode).toEqualTypeOf<'a'>();
    } else {
      expectTypeOf(mode).toEqualTypeOf<'b'>();
    }
  });

  it('does not narrow a value that already has the type of the other one', () => {
    const name = 'a' as string;
    const other = 'b' as string;

    expectTypeOf(isEqualShallow(name, other)).toEqualTypeOf<boolean>();
  });

  it('drops the union members that the type of the other value covers when it returns `false`', () => {
    const value = 'a' as string | number;
    const other = 'b' as string;

    if (!isEqualShallow(value, other)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }
  });
});
