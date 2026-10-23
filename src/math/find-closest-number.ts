/**
 * Finds the value closest to a target number, like the nearest available size
 * or the nearest step.
 * On a tie, the earlier value wins.
 * @param values - The numbers to choose from.
 * @param target - The number to get close to.
 * @returns The closest value, or `undefined` if there are no values.
 * @example
 * findClosestNumber([100, 400, 700, 900], 500);
 * // 400
 * findClosestNumber([10, 20], 15);
 * // 10
 * findClosestNumber([], 5);
 * // undefined
 */
export const findClosestNumber = (values: Iterable<number>, target: number) => {
  let closest: number | undefined;
  for (const value of values) {
    if (closest == null || Math.abs(value - target) < Math.abs(closest - target)) {
      closest = value;
    }
  }

  return closest;
};
