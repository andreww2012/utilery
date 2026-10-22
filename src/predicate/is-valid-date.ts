/**
 * Checks whether a value is a `Date` that holds an actual point in time.
 * `new Date('not a date')` is still a `Date`, but an invalid one: its time is
 * `NaN`, and formatting it gives `'Invalid Date'` or throws.
 * @param value - The value to check.
 * @returns `true` if the value is a valid `Date`, otherwise `false`.
 * @example
 * isValidDate(new Date('2024-01-31'));
 * // true
 * isValidDate(new Date('not a date'));
 * // false
 * isValidDate('2024-01-31');
 * // false
 * @example
 * // Parse a user-provided date
 * const date = new Date(input);
 * if (!isValidDate(date)) {
 *   throw new Error(`Invalid date: ${input}`);
 * }
 */
export const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());
