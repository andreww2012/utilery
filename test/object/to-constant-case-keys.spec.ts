import {toConstantCaseKeys} from '../../src/object/to-constant-case-keys.ts';

describe('object/toConstantCaseKeys', () => {
  it('constant-cases only the top-level keys', () => {
    expect(toConstantCaseKeys({fooBar: {bazQux: 1}})).toStrictEqual({FOO_BAR: {bazQux: 1}});
  });

  it('converts a class instance like a plain object', () => {
    class Settings {}

    expect(toConstantCaseKeys(Object.assign(new Settings(), {fooBar: 1}))).toStrictEqual({
      FOO_BAR: 1,
    });
  });

  it('returns arrays and built-in objects like dates and maps as they are', () => {
    const array = [{fooBar: 1}];
    const date = new Date(0);
    const map = new Map([['fooBar', 1]]);

    expect(toConstantCaseKeys(array)).toBe(array);
    expect(toConstantCaseKeys(date)).toBe(date);
    expect(toConstantCaseKeys(map)).toBe(map);
  });

  it('copies inherited enumerable keys too', () => {
    const object = Object.create({fooBar: 1}) as Record<string, number>;

    expect(toConstantCaseKeys(object)).toStrictEqual({FOO_BAR: 1});
  });
});
