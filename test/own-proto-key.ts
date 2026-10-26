/** JSON with an own `__proto__` key: the value of the key would become the prototype if assigned */
export const PROTO_KEY_JSON = '{"__proto__": {"isAdmin": true}, "a": 1}';

/** Parses `json` into an object that can have an own `__proto__` key, like untrusted input */
export const parseUntrusted = (json = PROTO_KEY_JSON) =>
  JSON.parse(json) as Record<string, unknown>;

/** The value of `__proto__` in {@link PROTO_KEY_JSON} */
const INJECTED_PROTOTYPE: Readonly<{isAdmin: boolean}> = {isAdmin: true};

/**
 * Ways to give a key that a property access converts to `name`, while a check like
 * `key === name` misses it, as `[description, convert]` pairs for `it.each`
 */
export const KEY_CONVERSIONS = [
  ['an array', (name: string): unknown => [name]],
  ['an object with toString', (name: string): unknown => ({toString: () => name})],
  ['a boxed string', (name: string): unknown => new Object(name)],
] as const;

/**
 * Asserts that `value` has its usual prototype and `__proto__` as an own property with `ownValue`,
 * so it doesn't inherit `isAdmin` from a replaced prototype
 */
export const expectOwnProtoKey = (
  value: unknown,
  ownValue: unknown = INJECTED_PROTOTYPE,
  prototype: unknown = Object.prototype,
) => {
  expect(Object.getPrototypeOf(value)).toBe(prototype);
  expect((value as Record<string, unknown>).isAdmin).toBeUndefined();
  expect(Object.getOwnPropertyDescriptor(value, '__proto__')?.value).toStrictEqual(ownValue);
};
