import {objectValuesUnsafe} from 'utilery/object';
import type {IsEqual} from 'utilery/types';

// With the option, an optional property can't be set to `undefined` unless its type includes it
const optional: IsEqual<
  ReturnType<typeof objectValuesUnsafe<{name: string; age?: number}>>,
  (string | number)[]
> = true;
void optional;

const optionalWithUndefined: IsEqual<
  ReturnType<typeof objectValuesUnsafe<{age?: number | undefined}>>,
  (number | undefined)[]
> = true;
void optionalWithUndefined;

const optionalElement: IsEqual<ReturnType<typeof objectValuesUnsafe<[1, 2?]>>, (1 | 2)[]> = true;
void optionalElement;
