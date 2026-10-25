import {lerp} from 'es-toolkit/math';
import {clamp} from './clamp.ts';

/**
 * Linearly interpolates between `min` and `max` by the factor `t`
 * (`min + (max - min) * t`).
 * With `t = 0` the result is `min`, with `t = 1` it is `max`, and `t = 0.5` is
 * the midpoint.
 *
 * By default `t` is **not** constrained, so values outside `[0, 1]` extrapolate
 * beyond the `min`/`max` endpoints (the standard behavior).
 * Pass `shouldClamp = true` to constrain `t` to `[0, 1]`, capping the result at the
 * endpoints.
 * @param min - The value returned when `t` is `0`.
 * @param max - The value returned when `t` is `1`.
 * @param t - The interpolation factor.
 * Not constrained unless `shouldClamp` is `true`.
 * @param shouldClamp - When `true`, `t` is clamped to `[0, 1]` so the result never
 * goes past `min`/`max`.
 * Defaults to `false` (allows extrapolation).
 * @returns The interpolated value.
 * @example
 * // Midpoint
 * interpolate(0, 10, 0.5);
 * // 5
 * @example
 * // Factors outside [0, 1] extrapolate by default
 * interpolate(0, 10, 1.5);
 * // 15
 * @example
 * // Pass `true` to clamp the factor and cap the result at the endpoints
 * interpolate(0, 10, 1.5, true);
 * // 10
 */
export const interpolate = (min: number, max: number, t: number, shouldClamp = false): number =>
  lerp(min, max, shouldClamp ? clamp(t, 0, 1) : t);
