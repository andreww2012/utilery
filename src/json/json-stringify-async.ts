// Not a named import: plain Node can't find all the named exports of this CommonJS package
import yieldableJson from 'yieldable-json';

// `@types/yieldable-json` types the replacer key as `number` (it is `string`, as in native
// `JSON.stringify`). Cast to a clean local signature so callers see correct types
type StringifyAsync = (
  value: object,
  replacer: ((key: string, value: unknown) => unknown) | (number | string)[] | null,
  space: number | string,
  intensity: number,
  callback: (error: Error | null, result: string) => void,
) => void;

/**
 * Asynchronous, non-blocking `JSON.stringify`: serializes `value` while
 * periodically yielding to the event loop, so large payloads don't starve it.
 * Promisified and typed.
 * @param value - The value to serialize.
 * @param replacer - Optional `JSON.stringify` replacer function or allow-list array.
 * @param space - Optional indentation (number of spaces or a string), as in `JSON.stringify`.
 * @param intensity - Work done per iteration before yielding, `1` to `32` (default `1`); higher
 * trades responsiveness for throughput.
 * @returns A promise resolving to the JSON string.
 * @example
 * // Serialize a large payload without blocking the event loop
 * await jsonStringifyAsync({a: 1, b: [2, 3]});
 * // '{"a":1,"b":[2,3]}'
 * @example
 * // Pretty-print with 2-space indentation
 * await jsonStringifyAsync({a: 1}, null, 2);
 * // '{\n  "a": 1\n}'
 */
export const jsonStringifyAsync = (
  value: object,
  replacer: ((key: string, value: unknown) => unknown) | (number | string)[] | null = null,
  space: number | string = 0,
  intensity = 1,
): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    (yieldableJson.stringifyAsync as unknown as StringifyAsync)(
      value,
      replacer,
      space,
      intensity,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
