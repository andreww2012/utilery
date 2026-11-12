import {isJsonObject} from '../../src/predicate/is-json-object.ts';
import type {JsonObject} from '../../src/types/json-object.ts';

describe('predicate/isJsonObject', () => {
  it('narrows a value to `JsonObject`, but only when it returns `true`', () => {
    const value = null as unknown;

    if (isJsonObject(value)) {
      expectTypeOf(value).toEqualTypeOf<JsonObject>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });

  it('keeps values of other types in the `false` branch', () => {
    const value = null as unknown as Record<string, unknown> | Map<string, number>;

    if (!isJsonObject(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<string, unknown> | Map<string, number>>();
    }
  });

  it('does not narrow a value that already has a JSON type', () => {
    const value = null as unknown as {name: string};

    expectTypeOf(isJsonObject(value)).toEqualTypeOf<boolean>();
    if (!isJsonObject(value)) {
      expectTypeOf(value).toEqualTypeOf<{name: string}>();
    }
  });

  it('drops the union members of JSON types when it returns `false`', () => {
    const value = undefined as {name: string} | undefined;

    if (!isJsonObject(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
