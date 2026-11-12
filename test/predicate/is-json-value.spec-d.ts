import {isJsonValue} from '../../src/predicate/is-json-value.ts';
import type {JsonValue} from '../../src/types/json-value.ts';

describe('predicate/isJsonValue', () => {
  it('narrows a value to `JsonValue`, but only when it returns `true`', () => {
    const value = null as unknown;

    if (isJsonValue(value)) {
      expectTypeOf(value).toEqualTypeOf<JsonValue>();
    } else {
      // `null` is always a JSON value
      // eslint-disable-next-line ts/no-empty-object-type -- what TypeScript narrows `unknown` to
      expectTypeOf(value).toEqualTypeOf<{} | undefined>();
    }
  });

  it('keeps values of other types in the `false` branch', () => {
    const value = null as unknown as Record<string, unknown> | Date;

    if (!isJsonValue(value)) {
      expectTypeOf(value).toEqualTypeOf<Record<string, unknown> | Date>();
    }
  });

  it('does not narrow a value that already has a JSON type', () => {
    const value = null as unknown as {name: string};

    expectTypeOf(isJsonValue(value)).toEqualTypeOf<boolean>();
    if (!isJsonValue(value)) {
      expectTypeOf(value).toEqualTypeOf<{name: string}>();
    }
  });

  it('drops the union members of JSON types when it returns `false`', () => {
    const value = undefined as {name: string} | undefined;

    if (!isJsonValue(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
