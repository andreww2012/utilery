/** Random integer from `minimum` to `maximum`, both inclusive, like `remeda`'s `randomInteger` */
export const randomInteger = (minimum: number, maximum: number, getRandom = Math.random) => {
  const low = Math.ceil(minimum);
  const high = Math.floor(maximum);
  if (high < low) {
    throw new RangeError(`The range [${minimum}, ${maximum}] contains no integer`);
  }

  return Math.floor(getRandom() * (high - low + 1) + low);
};

/**
 * Picks the bounds and the options from the arguments of `(maximum, options?)` or
 * `(minimum, maximum, options?)`
 */
export const resolveRandomArguments = (
  minimumOrMaximum: number,
  maximumOrOptions: number | {random?: () => number} | undefined,
  options: {random?: () => number} | undefined,
) =>
  typeof maximumOrOptions === 'number'
    ? ([minimumOrMaximum, maximumOrOptions, options?.random] as const)
    : ([0, minimumOrMaximum, maximumOrOptions?.random] as const);
