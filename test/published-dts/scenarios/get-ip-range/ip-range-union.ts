import type {IpRange} from 'utilery/net';

// Ranges from the types of the package and the ones only its runtime returns
const ranges: IpRange[] = ['private', 'uniqueLocal', 'broadcast', 'discard', 'segmentRouting'];
// @ts-expect-error -- not a range, so the union resolved instead of becoming `string` or `any`
const unknownRange: IpRange = 'public';
void ranges;
void unknownRange;
