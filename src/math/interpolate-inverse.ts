import {inverseLerp} from 'es-toolkit/math';
import {clamp} from './clamp.ts';

/**
 * Finds the factor `t` at which `value` lies between `min` and `max`, the inverse
 * of `interpolate` (`(value - min) / (max - min)`).
 * With `value = min` the result is `0`, with `value = max` it is `1`, and the
 * midpoint gives `0.5`.
 * When `min` and `max` are equal, the result is `0`.
 *
 * By default the result is **not** constrained, so values outside the range give
 * factors below `0` or above `1`.
 * Pass `shouldClamp = true` to constrain the result to `[0, 1]`.
 * @param min - The value that gives `0`.
 * @param max - The value that gives `1`.
 * @param value - The value to find the factor for.
 * @param shouldClamp - When `true`, the result is clamped to `[0, 1]`.
 * Defaults to `false`.
 * @returns The interpolation factor of `value`.
 * @example
 * // Progress of a value through a range
 * interpolateInverse(0, 200, 50);
 * // 0.25
 * @example
 * // Values outside the range give factors outside [0, 1] by default
 * interpolateInverse(10, 20, 25);
 * // 1.5
 * @example
 * // Pass `true` to clamp the result
 * interpolateInverse(10, 20, 25, true);
 * // 1
 */
export const interpolateInverse = (
  min: number,
  max: number,
  value: number,
  shouldClamp = false,
): number => {
  const factor = inverseLerp(min, max, value);
  return shouldClamp ? clamp(factor, 0, 1) : factor;
};
