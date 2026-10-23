import {freezeDeep} from '../../src/object/freeze-deep.ts';

describe('object/freezeDeep', () => {
  it('freezes the object and every nested object and array', () => {
    const object = freezeDeep({user: {tags: ['a']}});

    expect(Object.isFrozen(object)).toBe(true);
    expect(Object.isFrozen(object.user)).toBe(true);
    expect(Object.isFrozen(object.user.tags)).toBe(true);
  });

  it('skips the properties of nested values that are already frozen', () => {
    const inner = Object.freeze({settings: {}});
    freezeDeep({inner});

    expect(Object.isFrozen(inner.settings)).toBe(false);
  });

  it('visits the properties of a root that is already frozen', () => {
    const object = Object.freeze({settings: {}});
    freezeDeep(object);

    expect(Object.isFrozen(object.settings)).toBe(true);
  });
});
