import rangeParser from 'range-parser';

/** A parsed `Range` HTTP header */
export interface ParsedRangeHeader {
  /** The unit of the ranges, usually `'bytes'` */
  unit: string;
  /** The requested ranges, with inclusive `start` and `end` indexes */
  ranges: {start: number; end: number}[];
}

/**
 * Parses the `Range` HTTP header of a request for part of a resource, like
 * `'bytes=0-499'`, against the size of the resource: ranges are clamped to the
 * size, and suffix ranges (`'bytes=-500'`, the last 500 bytes) and open ranges
 * (`'bytes=500-'`) are turned into exact indexes.
 *
 * Pass `{combine: true}` to merge overlapping and adjacent ranges.
 * @param header - The header value (`null` and `undefined` are accepted, as returned by `Headers#get`).
 * @param size - The size of the resource, in the unit of the ranges.
 * @param options - Options.
 * @param options.combine - Merge overlapping and adjacent ranges (defaults to `false`).
 * @returns The unit and the ranges; `'unsatisfiable'` if no range is within the size (the server should respond with `416 Range Not Satisfiable`); `undefined` if the header is missing or invalid (it should be ignored).
 * @example
 * parseRangeHeader('bytes=0-499', 1000);
 * // {unit: 'bytes', ranges: [{start: 0, end: 499}]}
 * parseRangeHeader('bytes=-200', 1000);
 * // {unit: 'bytes', ranges: [{start: 800, end: 999}]}
 * @example
 * parseRangeHeader('bytes=2000-', 1000);
 * // 'unsatisfiable'
 * parseRangeHeader('invalid', 1000);
 * // undefined
 */
export const parseRangeHeader = (
  header: string | null | undefined,
  size: number,
  options?: {combine?: boolean},
): ParsedRangeHeader | 'unsatisfiable' | undefined => {
  if (!header) {
    return undefined;
  }

  const result = rangeParser(size, header, options);
  if (result === -1) {
    return 'unsatisfiable';
  }

  return result === -2
    ? undefined
    : {unit: result.type, ranges: result.map(({start, end}) => ({start, end}))};
};
