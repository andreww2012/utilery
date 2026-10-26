import {deleteByPath} from '../../src/object/delete-by-path.ts';
import {KEY_CONVERSIONS, expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

// A class whose prototype a path could reach through data that holds the class
class Model {}

// Test-only properties that a polluting delete would remove
const SHARED_TARGETS: readonly object[] = [
  Object.prototype,
  Object,
  Function.prototype,
  Model.prototype,
];

const expectSharedTargetsKept = () => {
  SHARED_TARGETS.forEach((target) => {
    expect(Object.hasOwn(target, 'testMarker')).toBe(true);
  });
};

describe('object/deleteByPath', () => {
  it('basic test', () => {
    const object = {a: {b: 1}};

    expect(deleteByPath(object, 'a.b')).toBe(true);
    expect(object).toStrictEqual({a: {}});
  });

  describe('paths that lead to a shared constructor or prototype', () => {
    beforeEach(() => {
      SHARED_TARGETS.forEach((target) => {
        Object.defineProperty(target, 'testMarker', {value: 1, configurable: true});
      });
    });

    afterEach(() => {
      SHARED_TARGETS.forEach((target) => {
        Reflect.deleteProperty(target, 'testMarker');
      });
    });

    it('refuses them', () => {
      [
        'constructor.prototype.testMarker',
        'constructor.testMarker',
        'a.constructor.prototype.testMarker',
        'a.toString.constructor.prototype.testMarker',
        'model.prototype.testMarker',
        ['constructor', 'prototype', 'testMarker'],
        ['__proto__', 'testMarker'],
        'a.__proto__.testMarker',
      ].forEach((path) => {
        expect(deleteByPath({a: {}, model: Model}, path)).toBe(false);
      });

      expectSharedTargetsKept();
    });

    it.each(KEY_CONVERSIONS)('refuses them with keys given as %s', (_, convert) => {
      [
        [convert('constructor'), convert('prototype'), 'testMarker'],
        [convert('constructor'), 'testMarker'],
        [convert('__proto__'), 'testMarker'],
        ['model', convert('prototype'), 'testMarker'],
      ].forEach((path) => {
        expect(deleteByPath({model: Model}, path as never)).toBe(false);
      });

      expectSharedTargetsKept();
    });
  });

  it('goes through and deletes own constructor and __proto__ keys like other keys', () => {
    const object = {constructor: {a: 1, b: 2}};

    expect(deleteByPath(object, 'constructor.a')).toBe(true);
    expect(deleteByPath(object, ['constructor', 'b'])).toBe(true);
    expect(object.constructor).toStrictEqual({});

    const untrusted = parseUntrusted('{"__proto__": {"isAdmin": true, "b": 1}}');

    expect(deleteByPath(untrusted, '__proto__.b')).toBe(true);

    expectOwnProtoKey(untrusted);

    expect(deleteByPath(untrusted, '__proto__')).toBe(true);
    expect(Object.hasOwn(untrusted, '__proto__')).toBe(false);
    expect(Object.getPrototypeOf(untrusted)).toBe(Object.prototype);
  });

  it.each(KEY_CONVERSIONS)('goes through own keys given as %s', (_, convert) => {
    const object = {constructor: {a: 1}};

    expect(deleteByPath(object, [convert('constructor'), 'a'] as never)).toBe(true);
    expect(object.constructor).toStrictEqual({});
  });
});
