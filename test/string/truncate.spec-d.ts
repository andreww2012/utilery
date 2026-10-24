import {type TruncateOptions, truncate} from '../../src/string/truncate.ts';

describe('string/truncate', () => {
  it('allows `separator` only for the end position', () => {
    truncate('a b', {separator: ' '});
    truncate('a b', {position: 'end', separator: ' '});
    // @ts-expect-error -- not supported for other positions
    truncate('a b', {position: 'start', separator: ' '});
  });

  it('has a single object type per position', () => {
    expectTypeOf<TruncateOptions>().toEqualTypeOf<
      | {length?: number; omission?: string; position?: 'end'; separator?: string | RegExp}
      | {length?: number; omission?: string; position: 'start' | 'middle'; separator?: never}
    >();
  });
});
