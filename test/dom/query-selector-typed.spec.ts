// @vitest-environment happy-dom
import {querySelectorTyped} from '../../src/dom/query-selector-typed.ts';

// Identity assertions deliberately avoid `<form>`: `happy-dom` wraps form elements in a
// Proxy for named-control access, so a held reference never matches the node a lookup returns
describe('dom/querySelectorTyped', () => {
  let panel: HTMLDivElement;

  beforeEach(() => {
    document.body.replaceChildren();
    panel = document.createElement('div');
    panel.id = 'login';
    panel.innerHTML = '<input name="email"><button id="submit">Go</button>';
    document.body.append(panel);
  });

  it('returns the first matching element', () => {
    const submit = querySelectorTyped('button#submit');

    expect(submit).toBeInstanceOf(HTMLButtonElement);
    expect(submit?.id).toBe('submit');
  });

  it('returns null when nothing matches', () => {
    expect(querySelectorTyped('button#missing')).toBeNull();
  });

  it('defaults the root to the whole document', () => {
    expect(querySelectorTyped('div#login')).toBe(panel);
  });

  it('restricts the search to the given root', () => {
    const other = document.createElement('div');
    other.innerHTML = '<button id="elsewhere">Nope</button>';
    document.body.append(other);

    expect(querySelectorTyped('button', panel)?.id).toBe('submit');
    expect(querySelectorTyped('button', other)?.id).toBe('elsewhere');
  });

  it('throws on a malformed selector, exactly as the native method does', () => {
    expect(() => querySelectorTyped('div[unclosed')).toThrow();
  });

  it('looks up custom elements through .as', () => {
    const widget = document.createElement('my-widget');
    document.body.append(widget);

    expect(querySelectorTyped.as('my-widget')).toBe(widget);
    expect(querySelectorTyped.as('my-widget', panel)).toBeNull();
  });
});
