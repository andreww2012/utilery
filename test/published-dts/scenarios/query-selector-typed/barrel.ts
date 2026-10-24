import {closestTyped, querySelectorAllTyped, querySelectorTyped} from 'utilery/dom';

const submit: HTMLButtonElement | null = querySelectorTyped('button#submit');
void submit;

const badges: HTMLSpanElement[] = querySelectorAllTyped('span.badge');
void badges;

const form: HTMLFormElement | null = closestTyped(document.body, 'form#login');
void form;

// @ts-expect-error the selector resolves to HTMLButtonElement, not HTMLInputElement
const wrong: HTMLInputElement | null = querySelectorTyped('button#submit');
void wrong;
