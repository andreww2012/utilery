import {objectAssign} from '../../src/object/object-assign.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/objectAssign', () => {
  it('copies source properties onto the target and returns it', () => {
    const target = {a: 1};
    const result = objectAssign(target, {b: 2});

    expect(result).toStrictEqual({a: 1, b: 2});
    expect(result).toBe(target);
  });

  it('applies sources left to right, later ones overriding', () => {
    expect(objectAssign({a: 1}, {a: 2}, {a: 3})).toStrictEqual({a: 3});
  });

  it('copies a __proto__ key as an own property instead of replacing the prototype', () => {
    const result = objectAssign({}, parseUntrusted());

    expectOwnProtoKey(result);

    expect(result.a).toBe(1);
  });
});
