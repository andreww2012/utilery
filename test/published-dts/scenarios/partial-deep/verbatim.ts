import type {PartialDeep} from 'utilery/types';

const value: PartialDeep<{a: {b: number}}> = {a: {}};
void value;
