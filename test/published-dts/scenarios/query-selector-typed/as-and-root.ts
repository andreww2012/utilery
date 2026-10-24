import {closestTyped, querySelectorAllTyped, querySelectorTyped} from 'utilery/dom';

interface MyWidget extends HTMLElement {
  value: number;
}

const container = document.createElement('div');

const scoped: HTMLLIElement | null = querySelectorTyped('li', container);
void scoped;

const widget: MyWidget | null = querySelectorTyped.as<MyWidget>('my-widget');
void widget;

const widgets: MyWidget[] = querySelectorAllTyped.as<MyWidget>('my-widget', container);
void widgets;

const closestWidget: MyWidget | null = closestTyped.as<MyWidget>(container, 'my-widget');
void closestWidget;

// @ts-expect-error an unknown tag falls back to Element without .as
const notWidget: MyWidget | null = querySelectorTyped('my-widget');
void notWidget;
