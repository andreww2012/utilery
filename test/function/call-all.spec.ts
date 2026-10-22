import {callAll} from '../../src/function/call-all.ts';

describe('function/callAll', () => {
  it('calls every function in order with the same arguments', () => {
    const calls: string[] = [];
    const combined = callAll(
      (value: number) => {
        calls.push(`a${value}`);
      },
      (value: number) => {
        calls.push(`b${value}`);
      },
    );
    combined(1);

    expect(calls).toStrictEqual(['a1', 'b1']);
  });

  it('skips falsy values', () => {
    const fn = vi.fn<(value: string) => void>();
    callAll(undefined, null, false, 0, 0n, '', fn)('x');

    expect(fn).toHaveBeenCalledExactlyOnceWith('x');
  });

  it('stops at the first function that throws', () => {
    const after = vi.fn<() => void>();
    const combined = callAll(() => {
      throw new Error('first');
    }, after);

    expect(combined).toThrow('first');
    expect(after).not.toHaveBeenCalled();
  });
});
