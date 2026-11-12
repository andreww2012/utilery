/** Checks whether a value is a `Date` that holds an actual point in time */
export const isValidDate: {
  /**
   * Checks whether a `Date` holds an actual point in time.
   * `new Date('not a date')` is still a `Date`, but an invalid one: its time is
   * `NaN`, and formatting it gives `'Invalid Date'` or throws.
   * The value is already a `Date`, so nothing is narrowed.
   * @param value - The date to check.
   * @returns `true` if the date is valid, otherwise `false`.
   * @example
   * isValidDate(new Date('2024-01-31'));
   * // true
   * isValidDate(new Date('not a date'));
   * // false
   * @example
   * // Parse a user-provided date
   * const date = new Date(input);
   * if (!isValidDate(date)) {
   *   throw new Error(`Invalid date: ${date.toString()}`); // `date` is still a `Date`
   * }
   */
  (value: Date): boolean;

  /**
   * Checks whether a value is a `Date` that holds an actual point in time, and
   * narrows it to `Date`.
   * `new Date('not a date')` is still a `Date`, but an invalid one: its time is
   * `NaN`, and formatting it gives `'Invalid Date'` or throws.
   * When it returns `false`, a union value loses its `Date` member, even though
   * the date may be invalid: `Date | undefined` becomes `undefined`.
   * @param value - The value to check.
   * @returns `true` if the value is a valid `Date`, otherwise `false`.
   * @example
   * isValidDate(new Date('2024-01-31'));
   * // true
   * isValidDate('2024-01-31');
   * // false
   * @example
   * declare const value: unknown;
   * if (isValidDate(value)) {
   *   value.toISOString(); // `value` is a `Date`
   * }
   */
  (value: unknown): value is Date;
} = (value: unknown): value is Date => value instanceof Date && !Number.isNaN(value.getTime());
