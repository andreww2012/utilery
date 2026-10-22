import {parseBoolean} from '../../src/misc/parse-boolean.ts';

describe('misc/parseBoolean', () => {
  it('narrows the type with a default', () => {
    expectTypeOf(parseBoolean('x', {default: false})).toEqualTypeOf<boolean>();
    expectTypeOf(parseBoolean('x')).toEqualTypeOf<boolean | undefined>();
  });
});
