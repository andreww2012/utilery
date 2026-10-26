import {flattenObject} from '../../src/object/flatten-object.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/flattenObject', () => {
  it('basic test', () => {
    expect(flattenObject({a: {b: {c: 1}}, d: 2})).toStrictEqual({'a.b.c': 1, d: 2});
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(flattenObject(parseUntrusted('{"__proto__": {}}')), {});
    expectOwnProtoKey(flattenObject(parseUntrusted('{"__proto__": []}')), []);
    expectOwnProtoKey(flattenObject({__pro: {to__: {}}}, {delimiter: ''}), {});
  });
});
