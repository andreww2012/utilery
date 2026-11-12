import {hasPath} from '../../src/object/has-path.ts';

describe('object/hasPath', () => {
  describe('own properties (default)', () => {
    it('returns true when the path exists', () => {
      expect(hasPath({a: {b: {c: 1}}}, 'a.b.c')).toBe(true);
      expect(hasPath({a: [{b: 1}]}, ['a', 0, 'b'])).toBe(true);
    });

    it('returns false when the path is missing', () => {
      expect(hasPath({a: 1}, 'a.b')).toBe(false);
    });

    it('returns false for inherited properties', () => {
      // eslint-disable-next-line un/no-type-assertion -- `Object.create` returns `any`
      const object = Object.create({inheritedKey: 1}) as object;

      expect(hasPath(object, 'inheritedKey')).toBe(false);
    });
  });

  describe('with {inherited: true}', () => {
    it('also finds inherited properties', () => {
      // eslint-disable-next-line un/no-type-assertion -- `Object.create` returns `any`
      const object = Object.create({inheritedKey: 1}) as object;

      expect(hasPath(object, 'inheritedKey', {inherited: true})).toBe(true);
    });
  });
});
