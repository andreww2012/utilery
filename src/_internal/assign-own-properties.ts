/**
 * Copies the own enumerable properties of each source onto `target`, like `Object.assign`, and
 * returns `target`.
 * Unlike `Object.assign`, an own `__proto__` key (which `JSON.parse` can create) becomes an own
 * property of `target` instead of replacing its prototype
 */
export const assignOwnProperties = <T extends object>(
  target: T,
  sources: readonly unknown[],
): T => {
  // Assigning keeps the semantics of `Object.assign` for setters and read-only properties
  const writableTarget = target as Record<PropertyKey, unknown>;
  sources.forEach((source) => {
    if (source == null) {
      return;
    }
    // Like `Object.assign`, also copies the properties of a primitive, like the characters of a
    // string
    const from = new Object(source) as Readonly<Record<PropertyKey, unknown>>;
    Reflect.ownKeys(from)
      .filter((key) => Object.prototype.propertyIsEnumerable.call(from, key))
      .forEach((key) => {
        if (key === '__proto__') {
          Object.defineProperty(target, key, {
            value: from[key],
            writable: true,
            enumerable: true,
            configurable: true,
          });
        } else {
          writableTarget[key] = from[key];
        }
      });
  });
  return target;
};
