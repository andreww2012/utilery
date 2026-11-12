import {readFileSafe} from '../../src/server/read-file-safe.ts';

describe('server/readFileSafe', () => {
  it('types the contents by the flag', () => {
    expectTypeOf(readFileSafe('file')).resolves.toEqualTypeOf<string | null>();
    expectTypeOf(readFileSafe('file', false)).resolves.toEqualTypeOf<string | null>();
    expectTypeOf(readFileSafe('file', true)).resolves.toEqualTypeOf<Buffer | null>();
  });

  it('accepts a flag of the `boolean` type', () => {
    const isBinary = Math.random() > 0.5;

    expectTypeOf(readFileSafe('file', isBinary)).resolves.toEqualTypeOf<string | Buffer | null>();
  });
});
