import type {RenameKeys} from '../../src/types/rename-keys.ts';
import type {OptionalUndefined} from '../exact-optional-property-types.ts';

describe('types/RenameKeys', () => {
  it('renames keys according to the map and keeps the others', () => {
    expectTypeOf<
      RenameKeys<{id: string; firstName: string}, {firstName: 'first_name'}>
    >().toEqualTypeOf<{id: string; first_name: string}>();
  });

  it('merges keys renamed to the same target into a union', () => {
    expectTypeOf<RenameKeys<{a: 1; b: 2}, {a: 'x'; b: 'x'}>>().toEqualTypeOf<{x: 1 | 2}>();
  });

  it('keeps the modifiers of the renamed keys', () => {
    expectTypeOf<RenameKeys<{readonly a?: 1}, {a: 'x'}>>().toEqualTypeOf<{readonly x?: 1}>();
  });

  it('ignores map entries for keys missing in the object', () => {
    expectTypeOf<RenameKeys<{a: 1}, {b: 'x'}>>().toEqualTypeOf<{a: 1}>();
  });

  it('makes a merged key optional only when all of its keys are optional', () => {
    expectTypeOf<RenameKeys<{a?: 1; b: 2}, {a: 'x'; b: 'x'}>>().toEqualTypeOf<{
      x: 1 | 2 | OptionalUndefined;
    }>();
    expectTypeOf<RenameKeys<{a?: 1; b?: 2}, {a: 'x'; b: 'x'}>>().toEqualTypeOf<{x?: 1 | 2}>();
  });

  it('makes a merged key readonly when any of its keys is readonly', () => {
    expectTypeOf<RenameKeys<{readonly a: 1; b: 2}, {a: 'x'; b: 'x'}>>().toEqualTypeOf<{
      readonly x: 1 | 2;
    }>();
  });
});
