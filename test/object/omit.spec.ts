import {omit} from '../../src/object/omit.ts';

describe('object/omit', () => {
  it('omits top-level keys', () => {
    expect(omit({a: 1, b: 2, c: 3}, ['b', 'c'])).toStrictEqual({a: 1});
  });

  it('omits deep path strings', () => {
    expect(omit({a: {b: 1, c: 2}}, ['a.b'])).toStrictEqual({a: {c: 2}});
  });

  describe('deep paths', () => {
    it('omits through array indexes without mutating the input', () => {
      const input = {users: [{name: 'Ada', password: 'x'}], meta: {id: 1, secret: 's'}};

      expect(omit(input, ['users.0.password', 'meta.secret'])).toStrictEqual({
        users: [{name: 'Ada'}],
        meta: {id: 1},
      });
      expect(input).toStrictEqual({
        users: [{name: 'Ada', password: 'x'}],
        meta: {id: 1, secret: 's'},
      });
    });

    it('omits a property of every array element with a wildcard', () => {
      const input = {
        users: [
          {name: 'Ada', password: 'x'},
          {name: 'Bob', password: 'y'},
        ],
      };

      expect(omit(input, ['users.*.password'])).toStrictEqual({
        users: [{name: 'Ada'}, {name: 'Bob'}],
      });
      expect(omit(input, ['users[*].password'])).toStrictEqual({
        users: [{name: 'Ada'}, {name: 'Bob'}],
      });
      expect(input.users[0]).toStrictEqual({name: 'Ada', password: 'x'});
    });

    it('omits a property of every object value with a wildcard', () => {
      expect(omit({byId: {a: {id: 'a', cache: 1}, b: {id: 'b'}}}, ['byId.*.cache'])).toStrictEqual({
        byId: {a: {id: 'a'}, b: {id: 'b'}},
      });
    });

    it('supports several wildcards in one path', () => {
      expect(omit({rows: [[{a: 1, b: 2}], [{a: 3, b: 4}]]}, ['rows.*.*.b'])).toStrictEqual({
        rows: [[{a: 1}], [{a: 3}]],
      });
    });

    it('skips elements that are not arrays or plain objects', () => {
      const date = new Date(0);

      expect(omit({list: [1, null, {a: 1, b: 2}, date]}, ['list.*.b'])).toStrictEqual({
        list: [1, null, {a: 1}, date],
      });
    });

    it('ignores paths that do not exist', () => {
      expect(omit({a: {b: 1}}, ['a.c.d', 'x.y', 'a.*.z'])).toStrictEqual({a: {b: 1}});
    });

    it('ignores a path without segments', () => {
      expect(omit({a: 1}, ['[]'])).toStrictEqual({a: 1});
    });

    it('shares the parts of the input outside the paths', () => {
      const input = {a: {b: 1, c: 2}, d: {e: 3}};
      const result = omit(input, ['a.b']);

      expect(result.d).toBe(input.d);
      expect(result.a).not.toBe(input.a);
    });

    it('treats a key containing a dot as a key when the object has it', () => {
      expect(omit({'a.b': 1, a: {b: 2}}, ['a.b'])).toStrictEqual({a: {b: 2}});
    });

    it('keeps the prototype of a copied object', () => {
      const dictionary = Object.assign(Object.create(null) as Record<string, unknown>, {
        a: 1,
        b: 2,
      });
      const result = omit({dictionary}, ['dictionary.a']);

      expect(Object.getPrototypeOf(result.dictionary)).toBeNull();
      expect({...result.dictionary}).toStrictEqual({b: 2});
    });

    it('keeps an own __proto__ key from replacing the prototype of a copy', () => {
      const input = JSON.parse('{"user": {"__proto__": {"isAdmin": true}, "password": "x"}}') as {
        user: Record<string, unknown>;
      };
      const result = omit(input, ['user.password']);

      expect(Object.getPrototypeOf(result.user)).toBe(Object.prototype);
      expect(result.user?.isAdmin).toBeUndefined();
      expect(Object.hasOwn(result.user || {}, '__proto__')).toBe(true);
    });
  });

  it('omits by a predicate', () => {
    expect(omit({a: 1, b: 'drop', c: 3}, (value) => typeof value === 'string')).toStrictEqual({
      a: 1,
      c: 3,
    });
  });
});
