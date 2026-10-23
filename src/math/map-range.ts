import {interpolate} from './interpolate.ts';

/**
 * Re-maps `value` from an input range to an output range, preserving its
 * relative position (an affine transformation between the two ranges).
 * For example, `5` within `[0, 10]` maps to `50` within `[0, 100]`.
 *
 * By default values outside the input range extrapolate past the output range.
 * Pass `shouldClamp = true` to constrain the result to the output range.
 * @param value - The number to re-map.
 * @param inputRange - The `[min, max]` range `value` is currently expressed in.
 * @param outputRange - The `[min, max]` range to map `value` into.
 * @param shouldClamp - When `true`, the result is constrained to `outputRange`.
 * Defaults to `false` (allows extrapolation).
 * @returns `value` expressed within `outputRange`.
 * @example
 * // Map the midpoint of one range to another
 * mapRange(5, [0, 10], [0, 100]);
 * // 50
 * @example
 * // Ranges may be inverted or offset
 * mapRange(0, [-1, 1], [0, 255]);
 * // 127.5
 * @example
 * // Values outside the input range extrapolate unless clamped
 * mapRange(15, [0, 10], [0, 100], true);
 * // 100
 */
export const mapRange = (
  value: number,
  inputRange: readonly [number, number],
  outputRange: readonly [number, number],
  shouldClamp = false,
): number => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;

  return interpolate(outputMin, outputMax, (value - inputMin) / (inputMax - inputMin), shouldClamp);
};
