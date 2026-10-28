import {bindKey} from 'es-toolkit/compat';

interface BindLate {
  /**
   * Creates a function that calls the method `object[key]`, with `object` as
   * `this` and `partialArguments` before the arguments it receives.
   * Unlike `Function.prototype.bind`, the method is looked up on every call, so
   * it may be replaced or added after binding.
   * Use `bindLate.placeholder` in `partialArguments` to leave a position for an
   * argument of the call.
   * @param object - The object to call the method on.
   * @param key - The key of the method.
   * @param partialArguments - The arguments to pass before the ones of the call.
   * @returns The bound function.
   * When called with `new`, it constructs `object[key]` instead.
   * @example
   * const greeter = {
   *   name: 'Ada',
   *   greet(greeting: string, punctuation: string) {
   *     return `${greeting} ${this.name}${punctuation}`;
   *   },
   * };
   * const greet = bindLate(greeter, 'greet', 'Hi');
   * greet('!');
   * // 'Hi Ada!'
   *
   * // Leave the first position for the call
   * const exclaim = bindLate(greeter, 'greet', bindLate.placeholder, '!');
   * exclaim('Hello');
   * // 'Hello Ada!'
   * @example
   * // The method is looked up on every call
   * greeter.greet = (greeting, punctuation) => `${greeting}ya${punctuation}`;
   * greet('!');
   * // 'Hiya!'
   */
  (
    object: object,
    key: string,
    ...partialArguments: unknown[]
    // eslint-disable-next-line ts/no-explicit-any -- the exact upstream type: the bound function may take and return anything
  ): (...parameters: any[]) => any;

  /** Leaves a position in the partial arguments for an argument of the call */
  placeholder: typeof bindKey.placeholder;
}

/**
 * Creates a function that calls the method `object[key]`, looking it up on
 * every call
 */
export const bindLate: BindLate = bindKey;
