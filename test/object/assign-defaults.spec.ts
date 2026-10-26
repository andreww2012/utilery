import {assignDefaults} from '../../src/object/assign-defaults.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/assignDefaults', () => {
  it('fills missing top-level keys and mutates the target by default', () => {
    const target = {a: 1};
    const result = assignDefaults(target, {a: 9, b: 2});

    expect(result).toBe(target);
    expect(result).toStrictEqual({a: 1, b: 2});
  });

  it('applies an array of sources left to right, first defined value wins', () => {
    const result = assignDefaults({a: 1}, [{b: 2}, {b: 9, c: 3}]);

    expect(result).toStrictEqual({a: 1, b: 2, c: 3});
  });

  it('fills recursively with {deep: true}', () => {
    const target = {a: {x: 1}};
    const result = assignDefaults(target, {a: {x: 9, y: 2}}, {deep: true});

    expect(result).toBe(target);
    expect(result).toStrictEqual({a: {x: 1, y: 2}});
  });

  it('returns a new object without mutating the target when {copy: true}', () => {
    const target = {a: 1};
    const result = assignDefaults(target, {b: 2}, {copy: true});

    expect(result).not.toBe(target);
    expect(target).toStrictEqual({a: 1});
    expect(result).toStrictEqual({a: 1, b: 2});
  });

  it('combines {copy: true} with {deep: true}', () => {
    const target = {a: {x: 1}};
    const result = assignDefaults(target, {a: {y: 2}}, {copy: true, deep: true});

    expect(result).not.toBe(target);
    expect(target).toStrictEqual({a: {x: 1}});
    expect(result).toStrictEqual({a: {x: 1, y: 2}});
  });

  it('copies errors and null-prototype objects as they are when {copy: true}', () => {
    const error = assignDefaults(new Error('x'), {code: 1}, {copy: true});

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('x');
    expect(error.code).toBe(1);

    const dictionary = Object.assign(Object.create(null) as Record<string, unknown>, {a: 1});
    const target = {dictionary, cause: new TypeError('y')};
    const result = assignDefaults(target, {b: 2}, {copy: true});

    expect(Object.getPrototypeOf(result.dictionary)).toBeNull();
    expect(result.dictionary).not.toBe(dictionary);
    expect(result.cause).toBeInstanceOf(TypeError);
    expect(result.cause).not.toBe(target.cause);
    expect(Object.getPrototypeOf(assignDefaults(dictionary, {b: 2}, {copy: true}))).toBeNull();
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(assignDefaults({}, parseUntrusted(), {deep: true}));
    expectOwnProtoKey(
      assignDefaults({a: {}}, parseUntrusted('{"a": {"__proto__": {"isAdmin": true}}}'), {
        deep: true,
      }).a,
    );
    expectOwnProtoKey(assignDefaults(parseUntrusted(), {b: 1}, {copy: true}));
  });
});
