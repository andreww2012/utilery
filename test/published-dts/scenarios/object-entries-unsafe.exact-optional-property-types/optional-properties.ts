import {objectEntriesUnsafe} from 'utilery/object';
import type {IsEqual} from 'utilery/types';

// With the option, an optional property can't be set to `undefined` unless its type includes it
const optional: IsEqual<
  ReturnType<typeof objectEntriesUnsafe<{name: string; age?: number}>>,
  ['name' | 'age', string | number][]
> = true;
void optional;

const optionalWithUndefined: IsEqual<
  ReturnType<typeof objectEntriesUnsafe<{age?: number | undefined}>>,
  ['age', number | undefined][]
> = true;
void optionalWithUndefined;

const optionalElement: IsEqual<
  ReturnType<typeof objectEntriesUnsafe<[1, 2?]>>,
  ['0' | '1', 1 | 2][]
> = true;
void optionalElement;
