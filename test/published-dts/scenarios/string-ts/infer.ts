import {charAt, stringConcat, toCamelCase} from 'utilery/string';
import {toConstantCaseKeysDeep, toKebabCaseKeys} from 'utilery/object';
import type {ToConstantCaseKeys} from 'utilery/types';

// Converter preserves the literal type (es-toolkit runtime + bundled `string-ts` type)
const camel = toCamelCase('foo-bar');
const camelOk: 'fooBar' = camel;
void camelOk;
// @ts-expect-error 'foo-bar' camel-cases to 'fooBar', not 'nope' (fails if it collapsed to `string`/`any`)
const camelWrong: 'nope' = camel;
void camelWrong;

// Typed native-method wrapper (bundled `string-ts` runtime + type)
const first: 'h' = charAt('hello', 0);
void first;

// Native-method wrapper backed by the bundled `string-ts` runtime + type
const joined: 'ab' = stringConcat('a', 'b');
void joined;

// Shallow key transform: only the top-level key is renamed, the nested one is left alone
const kebab = toKebabCaseKeys({fooBar: {bazQux: 1}});
const kebabValue: {bazQux: number} = kebab['foo-bar'];
void kebabValue;

// Deep key transform
const constantDeep = toConstantCaseKeysDeep({fooBar: {bazQux: 1}});
const deepValue: number = constantDeep.FOO_BAR.BAZ_QUX;
void deepValue;

// Net-new type added to `utilery/types`
const keys: ToConstantCaseKeys<{fooBar: 1}> = {FOO_BAR: 1};
void keys;
