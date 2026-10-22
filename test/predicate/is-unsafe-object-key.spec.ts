// Values of known types are passed on purpose, to check the runtime result
/* eslint-disable ts/no-unnecessary-condition */
import {isUnsafeObjectKey} from '../../src/predicate/is-unsafe-object-key.ts';

describe('predicate/isUnsafeObjectKey', () => {
  it('detects keys used for prototype pollution', () => {
    expect(isUnsafeObjectKey('__proto__')).toBe(true);
    expect(isUnsafeObjectKey('constructor')).toBe(true);
    expect(isUnsafeObjectKey('prototype')).toBe(true);
  });

  it('accepts other keys', () => {
    expect(isUnsafeObjectKey('name')).toBe(false);
    expect(isUnsafeObjectKey(Symbol('__proto__'))).toBe(false);
    expect(isUnsafeObjectKey(0)).toBe(false);
  });
});
