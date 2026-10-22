import {interopDefault} from '../../src/misc/interop-default.ts';

describe('misc/interopDefault', () => {
  it('returns the default export when the module has one', async () => {
    await expect(interopDefault({default: 42, named: 'x'})).resolves.toBe(42);
  });

  it('returns the module itself when it has no default export', async () => {
    const module = {named: 'x'};

    await expect(interopDefault(module)).resolves.toBe(module);
  });

  it('accepts a promise of the module', async () => {
    await expect(interopDefault(Promise.resolve({default: 'value'}))).resolves.toBe('value');
  });

  it('returns a present default export even if it is falsy', async () => {
    await expect(interopDefault({default: 0})).resolves.toBe(0);
    await expect(interopDefault({default: ''})).resolves.toBe('');
  });

  it('returns the module itself when the default export is `null` or `undefined`', async () => {
    const withUndefined = {default: undefined, named: 'x'};
    const withNull = {default: null};

    await expect(interopDefault(withUndefined)).resolves.toBe(withUndefined);
    await expect(interopDefault(withNull)).resolves.toBe(withNull);
  });

  it('reads the default export of a function', async () => {
    const fn = Object.assign(() => {}, {default: 'value'});

    await expect(interopDefault(fn)).resolves.toBe('value');
  });

  it('returns primitives and nullish values as is', async () => {
    await expect(interopDefault('module')).resolves.toBe('module');
    await expect(interopDefault(null)).resolves.toBeNull();
  });

  it('works with a real dynamic import', async () => {
    const result = await interopDefault(import('../../src/misc/interop-default.ts'));

    expect(result.interopDefault).toBe(interopDefault);
  });
});
