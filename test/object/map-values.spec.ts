import {mapValues} from '../../src/object/map-values.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('object/mapValues', () => {
  it('basic test', () => {
    expect(mapValues({a: 1, b: 2}, (value) => value * 2)).toStrictEqual({a: 2, b: 4});
  });

  it('defines a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(mapValues(parseUntrusted(), (value) => value));
  });
});
