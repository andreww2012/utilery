import type {ElementFromSelector, ElementFromSelectorStrict, ElementFromTagName} from 'utilery/dom';

const app: ElementFromSelector<'div#app'> = document.createElement('div');
void app;

const submit: ElementFromSelector<'form#login > button.submit'> = document.createElement('button');
void submit;

const canvas: ElementFromTagName<'canvas'> = document.createElement('canvas');
void canvas;

const strict: ElementFromSelectorStrict<'div#app'> = document.createElement('div');
void strict;

// A malformed selector collapses to `never`, so nothing is assignable to it
declare const malformed: ElementFromSelectorStrict<'div#app >'>;
const never_: never = malformed;
void never_;

// @ts-expect-error the selector resolves to HTMLDivElement, not HTMLSpanElement
const wrong: ElementFromSelector<'div#app'> = document.createElement('span');
void wrong;
