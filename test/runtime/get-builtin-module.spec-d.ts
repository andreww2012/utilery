import type fs from 'node:fs';
import {getBuiltinModule} from '../../src/runtime/get-builtin-module.ts';

describe('runtime/getBuiltinModule', () => {
  it('types the module', () => {
    expectTypeOf(getBuiltinModule('node:fs')).toEqualTypeOf<typeof fs | undefined>();
  });

  it('only accepts built-in module IDs', () => {
    // @ts-expect-error -- not a built-in module
    getBuiltinModule('lodash');
  });
});
