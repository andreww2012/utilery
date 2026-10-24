import type {Ms} from 'utilery/types';

// Exact-literal round trip: both assignments compile only if `Ms<'42m'>` is the
// literal `2_520_000` and not the widened `number`
const forward: Ms<'42m'> = 2_520_000;
const exact: 2_520_000 = forward;
void exact;

// @ts-expect-error 42 is not the millisecond value of '42m' (fails if `Ms` widened to `number`)
const widened: Ms<'42m'> = 42;
void widened;

// Invalid input resolves to `never`
const invalid: Ms<'42mss'> = undefined as never;
void invalid;
