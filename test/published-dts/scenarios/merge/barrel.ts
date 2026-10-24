import type {MergeTypes} from 'utilery';

const merged: MergeTypes<{a: 1; b: 2}, {b: 3}> = {a: 1, b: 3};
void merged;
