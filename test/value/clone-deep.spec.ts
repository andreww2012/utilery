import {cloneDeep} from '../../src/value/clone-deep.ts';
import {expectOwnProtoKey, parseUntrusted} from '../own-proto-key.ts';

describe('value/cloneDeep', () => {
  describe('without a customizer', () => {
    it('returns primitives as-is', () => {
      expect(cloneDeep(29)).toBe(29);
      expect(cloneDeep('hello')).toBe('hello');
      expect(cloneDeep(null)).toBeNull();
    });

    it('clones a flat object', () => {
      const source = {a: 1, b: 'x'};
      const cloned = cloneDeep(source);

      expect(cloned).toStrictEqual(source);
      expect(cloned).not.toBe(source);
    });

    it('clones nested structures so that inner references diverge', () => {
      const source = {a: 1, b: {c: 2, d: [3, 4]}};
      const cloned = cloneDeep(source);

      expect(cloned).toStrictEqual(source);
      expect(cloned.b).not.toBe(source.b);
      expect(cloned.b.d).not.toBe(source.b.d);

      cloned.b.c = 99;

      expect(source.b.c).toBe(2);
    });

    it('clones arrays of objects independently', () => {
      const source = [{a: 1}, {a: 2}];
      const cloned = cloneDeep(source);

      expect(cloned).toStrictEqual(source);
      expect(cloned[0]).not.toBe(source[0]);
    });

    it('clones Date instances', () => {
      const date = new Date('2026-01-01T00:00:00.000Z');
      const cloned = cloneDeep(date);

      expect(cloned).toBeInstanceOf(Date);
      expect(cloned).not.toBe(date);
      expect(cloned.getTime()).toBe(date.getTime());
    });

    it('clones Map instances', () => {
      const source = new Map<string, {n: number}>([['k', {n: 1}]]);
      const cloned = cloneDeep(source);

      expect(cloned).toBeInstanceOf(Map);
      expect(cloned).not.toBe(source);
      expect(cloned.get('k')).toStrictEqual({n: 1});
      expect(cloned.get('k')).not.toBe(source.get('k'));
    });

    it('clones Set instances', () => {
      const source = new Set([1, 2, 3]);
      const cloned = cloneDeep(source);

      expect(cloned).toBeInstanceOf(Set);
      expect(cloned).not.toBe(source);
      expect([...cloned]).toStrictEqual([1, 2, 3]);
    });

    it('handles circular references', () => {
      const source: {self?: unknown; value: number} = {value: 1};
      source.self = source;

      const cloned = cloneDeep(source);

      expect(cloned).not.toBe(source);
      expect(cloned.self).toBe(cloned);
      expect(cloned.value).toBe(1);
    });
  });

  describe('with a customizer', () => {
    it('uses the customizer return value when defined', () => {
      const cloned = cloneDeep({a: 1, b: {c: 2}}, (value) =>
        typeof value === 'number' ? value * 2 : undefined,
      );

      expect(cloned).toStrictEqual({a: 2, b: {c: 4}});
    });

    it('falls back to the default strategy when the customizer returns undefined', () => {
      const source = {a: 1, b: {c: 2}};
      const cloned = cloneDeep(source, () => undefined);

      expect(cloned).toStrictEqual(source);
      expect(cloned).not.toBe(source);
      expect(cloned.b).not.toBe(source.b);
    });

    it('passes value, key, root and stack to the customizer', () => {
      const source = {a: 1};
      const seen: {value: unknown; key: PropertyKey | undefined; root: unknown}[] = [];

      cloneDeep(source, (value, key, root, stack) => {
        seen.push({value, key, root});

        expect(stack).toBeInstanceOf(Map);
      });

      expect(seen).toContainEqual({value: source, key: undefined, root: source});
      expect(seen).toContainEqual({value: 1, key: 'a', root: source});
    });
  });

  it('copies a __proto__ key as an own property instead of replacing the prototype', () => {
    expectOwnProtoKey(cloneDeep(parseUntrusted()));
    expectOwnProtoKey(cloneDeep(parseUntrusted('{"a": {"__proto__": {"isAdmin": true}}}')).a);
    expectOwnProtoKey(cloneDeep(parseUntrusted(), () => undefined));
  });
});
