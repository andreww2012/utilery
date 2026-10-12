import {readFilesInDirectorySafe} from '../../src/server/read-files-in-directory-safe.ts';
import {readJsonFileSafe} from '../../src/server/read-json-file-safe.ts';

interface DirectoryFile<Contents> {
  path: string;
  relativePath: string;
  contents: Contents;
}

describe('server/readFilesInDirectorySafe', () => {
  it('gives string contents by default and Buffer contents with asBinary: true', () => {
    expectTypeOf(readFilesInDirectorySafe('dir')).toEqualTypeOf<
      Promise<DirectoryFile<string>[] | null>
    >();
    expectTypeOf(readFilesInDirectorySafe('dir', {asBinary: true})).toEqualTypeOf<
      Promise<DirectoryFile<Buffer>[] | null>
    >();
  });
});

describe('server/readJsonFileSafe', () => {
  it('asserts the shape of the contents with a type argument', () => {
    expectTypeOf(readJsonFileSafe<{version?: string}>('package.json')).toEqualTypeOf<
      Promise<{version?: string} | null>
    >();
  });
});
