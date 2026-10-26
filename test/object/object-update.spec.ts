import {objectUpdate} from '../../src/object/object-update.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/objectUpdate', () => {
  it('applies the partial update in place and returns the target', () => {
    const target = {name: 'Ada', age: 41};
    const result = objectUpdate(target, {age: 42});

    expect(result).toStrictEqual({name: 'Ada', age: 42});
    expect(result).toBe(target);
  });

  it('copies a __proto__ key as an own property instead of replacing the prototype', () => {
    const target = {a: 0};
    objectUpdate(target, parseUntrusted() as {a: number});

    expectOwnProtoKey(target);

    expect(target.a).toBe(1);
  });
});
