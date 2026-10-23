import {ms} from 'unutils';
import {ms as msFromMisc} from 'unutils/misc';

// Return type is the exact literal, not `number`
const value = ms<'42m'>(2_520_000);
const exact: 2_520_000 = value;
void exact;

const negative = msFromMisc<'-3.14d'>(-271_296_000);
const exactNegative: -271_296_000 = negative;
void exactNegative;

// @ts-expect-error wrong millisecond value for '42m' (fails if the generic stopped constraining the argument)
ms<'42m'>(42);
