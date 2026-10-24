import 'utilery/dom/query-selector-typed.global';

const submit: HTMLButtonElement | null = document.querySelector('button#submit');
void submit;

const badges: NodeListOf<HTMLSpanElement> = document.querySelectorAll('span.badge');
void badges;

const container = document.createElement('div');
const item: HTMLLIElement | null = container.querySelector('li');
void item;

const form: HTMLFormElement | null = document.body.closest('form#login');
void form;

// @ts-expect-error the selector resolves to HTMLButtonElement, not HTMLInputElement
const wrong: HTMLInputElement | null = document.querySelector('button#submit');
void wrong;
