import {getErrorMessage} from '../../src/misc/get-error-message.ts';

describe('misc/getErrorMessage', () => {
  it('returns the message of an error', () => {
    expect(getErrorMessage(new Error('Not found'))).toBe('Not found');
    expect(getErrorMessage(new TypeError('Bad type'))).toBe('Bad type');
  });

  it('returns the message of an error-like object', () => {
    expect(getErrorMessage({message: 'Rate limited', code: 429})).toBe('Rate limited');
  });

  it('returns a string as is', () => {
    expect(getErrorMessage('Timed out')).toBe('Timed out');
  });

  it('converts other primitives to a string', () => {
    expect(getErrorMessage(404)).toBe('404');
    expect(getErrorMessage(10n)).toBe('10');
    expect(getErrorMessage(false)).toBe('false');
    expect(getErrorMessage(Symbol('failure'))).toBe('Symbol(failure)');
  });

  it('returns the fallback when there is no meaningful message', () => {
    expect(getErrorMessage(null)).toBe('Unknown error');
    expect(getErrorMessage(undefined)).toBe('Unknown error');
    expect(getErrorMessage('')).toBe('Unknown error');
    // eslint-disable-next-line unicorn/error-message -- an empty message is what is being tested
    expect(getErrorMessage(new Error())).toBe('Unknown error');
    expect(getErrorMessage({code: 'E_FAIL'})).toBe('Unknown error');
    expect(getErrorMessage({message: 42})).toBe('Unknown error');
    expect(getErrorMessage(() => {})).toBe('Unknown error');
  });

  it('uses a custom fallback', () => {
    expect(getErrorMessage({code: 'E_FAIL'}, 'Request failed')).toBe('Request failed');
  });

  it('accepts the fallback in the options', () => {
    expect(getErrorMessage(null, {fallback: 'Request failed'})).toBe('Request failed');
  });

  it('appends the error code with `includeCode`', () => {
    expect(
      getErrorMessage(Object.assign(new Error('Not found'), {code: 'E404'}), {includeCode: true}),
    ).toBe('Not found (E404)');
    expect(getErrorMessage({message: 'Rate limited', code: 429}, {includeCode: true})).toBe(
      'Rate limited (429)',
    );
    expect(getErrorMessage({code: 'E_FAIL'}, {includeCode: true})).toBe('Unknown error (E_FAIL)');
  });

  it('does not repeat a code already in the message', () => {
    const error = Object.assign(new Error("ENOENT: no such file or directory, open 'x'"), {
      code: 'ENOENT',
    });

    expect(getErrorMessage(error, {includeCode: true})).toBe(error.message);
    expect(getErrorMessage({message: 'x', code: {nested: true}}, {includeCode: true})).toBe('x');
  });
});
