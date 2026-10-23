import {asWritable} from 'ts-extras';
import type {StripReadonly} from '../types/strip-readonly.ts';

/** Types a value as writable, removing `readonly` from its properties (see `StripReadonly`) */
export const castToWritableUnsafe: {
  /**
   * Types a value as writable, removing `readonly` from its properties (see
   * `StripReadonly`).
   * It does nothing at runtime: the value is not copied, and frozen objects stay
   * frozen.
   * It is "unsafe" because writing to a property that is really read-only fails at
   * runtime.
   * @param value - The value to type.
   * @returns `value` itself, typed as writable.
   * @example
   * const config = castToWritableUnsafe(readonlyConfig);
   * config.port = 8080;
   */
  <T>(value: T): StripReadonly<T>;
} = asWritable;
