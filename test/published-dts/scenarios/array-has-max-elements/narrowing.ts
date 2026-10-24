import {arrayHasMaxElements} from 'utilery';
import {arrayHasMaxElements as arrayHasMaxElementsFromArray} from 'utilery/array';
import type {ArrayWithMaxLength} from 'utilery/types';

declare const values: number[];

if (arrayHasMaxElements(values, 2)) {
  // Fails if the published narrowing collapsed back to `number[]`
  const narrowed: [] | [number] | [number, number] = values;
  void narrowed;

  const length: 0 | 1 | 2 = values.length;
  void length;
}

declare const pair: [string, ...number[]];

if (arrayHasMaxElementsFromArray(pair, 2)) {
  // Fails if the per-position element types were lost
  const narrowedPair: [string] | [string, number] = pair;
  void narrowedPair;
}

declare const readonlyValues: readonly string[];

if (arrayHasMaxElements(readonlyValues, 1)) {
  const narrowedReadonly: readonly [] | readonly [string] = readonlyValues;
  void narrowedReadonly;
}

declare const triple: [string, number, boolean];

if (arrayHasMaxElements(triple, 2)) {
  // Three required elements can never fit into two, so this branch is `never`
  const impossible: never = triple;
  void impossible;
}

const withinMaximum: ArrayWithMaxLength<number[], 1> = [1];
void withinMaximum;

// @ts-expect-error two elements exceed the maximum of one
const overMaximum: ArrayWithMaxLength<number[], 1> = [1, 2];
void overMaximum;
