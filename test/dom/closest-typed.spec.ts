// @vitest-environment happy-dom
import {closestTyped} from '../../src/dom/closest-typed.ts';

// Identity assertions deliberately avoid `<form>`: `happy-dom` wraps form elements in a
// Proxy for named-control access, so a held reference never matches the node a lookup returns
describe('dom/closestTyped', () => {
  let panel: HTMLDivElement;
  let field: HTMLInputElement;

  beforeEach(() => {
    document.body.replaceChildren();
    panel = document.createElement('div');
    panel.id = 'login';
    field = document.createElement('input');
    panel.append(field);
    document.body.append(panel);
  });

  it('returns the nearest matching ancestor', () => {
    expect(closestTyped(field, 'div#login')).toBe(panel);
  });

  it('matches the element itself before its ancestors', () => {
    expect(closestTyped(field, 'input')).toBe(field);
  });

  it('returns null when no ancestor matches', () => {
    expect(closestTyped(field, 'table')).toBeNull();
  });

  it('stops at the nearest of several matching ancestors', () => {
    const inner = document.createElement('div');
    panel.append(inner);
    inner.append(field);

    expect(closestTyped(field, 'div')).toBe(inner);
  });

  it('throws on a malformed selector, exactly as the native method does', () => {
    expect(() => closestTyped(field, 'div[unclosed')).toThrow();
  });

  it('looks up custom elements through .as', () => {
    const widget = document.createElement('my-widget');
    panel.append(widget);
    widget.append(field);

    expect(closestTyped.as(field, 'my-widget')).toBe(widget);
  });
});
