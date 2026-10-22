import yn from 'yn';

/** Options of `parseBoolean` */
export interface ParseBooleanOptions {
  /** The result for unrecognized values. Defaults to `undefined` */
  default?: boolean;
  /** Accept typos of `yes` and `no` that are close on the keyboard. Defaults to `false` */
  lenient?: boolean;
}

/**
 * Parses a yes/no-like value, like an environment variable, a query parameter
 * or a CLI answer, into a boolean.
 *
 * Recognizes (case-insensitively, ignoring surrounding whitespace) `'y'`,
 * `'yes'`, `'t'`, `'true'`, `'1'`, `'on'` and `true`/`1` as `true`, and `'n'`,
 * `'no'`, `'f'`, `'false'`, `'0'`, `'off'` and `false`/`0` as `false`. Other
 * values give `default`, which is `undefined` unless given. Pass
 * `{lenient: true}` to also accept typos of `yes` and `no` that are close on
 * the keyboard.
 * @param value - The value to parse.
 * @param options - Options.
 * @param options.default - The result for unrecognized values (defaults to `undefined`).
 * @param options.lenient - Accept typos of `yes` and `no` that are close on the keyboard (defaults to `false`).
 * @returns `true` or `false`, or `default` for an unrecognized value.
 * @example
 * parseBoolean('yes');
 * // true
 * parseBoolean('OFF');
 * // false
 * parseBoolean('maybe');
 * // undefined
 * @example
 * // An environment variable with a default
 * const debug = parseBoolean(process.env.DEBUG, {default: false});
 * // boolean
 * @example
 * parseBoolean('mo', {lenient: true});
 * // false
 */
export function parseBoolean(
  value: unknown,
  options: ParseBooleanOptions & {default: boolean},
): boolean;
export function parseBoolean(value: unknown, options?: ParseBooleanOptions): boolean | undefined;
export function parseBoolean(value: unknown, options?: ParseBooleanOptions): boolean | undefined {
  return yn(value, options);
}
