/**
 * Runs the tests twice: with the native method `key` of `target` and without it, so both the
 * native path of a utility and its fallback are covered.
 * Where the environment doesn't have the method, `standIn` takes its place, so the real native
 * method is only tested where it exists.
 * @param target - The object the native method belongs to, like `Map.prototype`.
 * @param key - The name of the native method.
 * @param standIn - A simple implementation of the native method.
 * @param tests - Declares the tests.
 */
export const describeWithAndWithoutNative = (
  target: object,
  key: string,
  standIn: (...parameters: never[]) => unknown,
  tests: () => void,
) => {
  const nativeDescriptor = Object.getOwnPropertyDescriptor(target, key);

  describe.for(['native', 'fallback'] as const)(`%s \`${key}\``, (mode) => {
    beforeAll(() => {
      if (mode === 'fallback') {
        Reflect.deleteProperty(target, key);
      } else if (!nativeDescriptor) {
        Object.defineProperty(target, key, {value: standIn, configurable: true, writable: true});
      }
    });

    afterAll(() => {
      Reflect.deleteProperty(target, key);
      if (nativeDescriptor) {
        Object.defineProperty(target, key, nativeDescriptor);
      }
    });

    tests();
  });
};
