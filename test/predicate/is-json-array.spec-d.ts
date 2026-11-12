import {isJsonArray} from '../../src/predicate/is-json-array.ts';
import type {JsonArray} from '../../src/types/json-array.ts';

describe('predicate/isJsonArray', () => {
  it('narrows a value to `JsonArray`, but only when it returns `true`', () => {
    const value = null as unknown;

    if (isJsonArray(value)) {
      expectTypeOf(value).toEqualTypeOf<JsonArray>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });

  it('keeps values of other types in the `false` branch', () => {
    const value = null as unknown as unknown[] | Date[];

    if (!isJsonArray(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown[] | Date[]>();
    }
  });

  it('does not narrow a value that already has a JSON type', () => {
    const value = null as unknown as {id: number}[];

    expectTypeOf(isJsonArray(value)).toEqualTypeOf<boolean>();
    if (!isJsonArray(value)) {
      expectTypeOf(value).toEqualTypeOf<{id: number}[]>();
    }
  });

  it('drops the union members of JSON types when it returns `false`', () => {
    const value = undefined as {id: number}[] | undefined;

    if (!isJsonArray(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
