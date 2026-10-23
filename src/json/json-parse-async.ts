import {parseAsync} from 'yieldable-json';

// `@types/yieldable-json` types the reviver key as `number` (it is `string`, as in native
// `JSON.parse`). Cast to a clean local signature so callers see correct types
const parse = parseAsync as unknown as {
  (
    text: string,
    reviver: (key: string, value: unknown) => unknown,
    intensity: number,
    callback: (error: Error | null, result: unknown) => void,
  ): void;
  (text: string, intensity: number, callback: (error: Error | null, result: unknown) => void): void;
};

/**
 * Asynchronous, non-blocking `JSON.parse`: parses `text` while periodically
 * yielding to the event loop, so large inputs don't starve it.
 * Promisified and typed.
 * @param text - The JSON string to parse.
 * @param reviver - Optional `JSON.parse` reviver function.
 * @param intensity - Work done per iteration before yielding, `1` to `32` (default `1`); higher
 * trades responsiveness for throughput.
 * @returns A promise resolving to the parsed value as `unknown`; assert or validate the shape at
 * the call site.
 * @example
 * // Parse a large payload without blocking the event loop
 * await jsonParseAsync('{"a": 1, "b": [2, 3]}');
 * // {a: 1, b: [2, 3]}
 * @example
 * // A higher intensity does more work per tick (less yielding)
 * await jsonParseAsync(hugeJsonString, undefined, 8);
 */
export const jsonParseAsync = (
  text: string,
  reviver?: (key: string, value: unknown) => unknown,
  intensity = 1,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const callback = (error: Error | null, result: unknown) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    };

    if (reviver) {
      parse(text, reviver, intensity, callback);
    } else {
      parse(text, intensity, callback);
    }
  });
