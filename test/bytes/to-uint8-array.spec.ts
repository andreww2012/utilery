import {toUint8Array} from '../../src/bytes/to-uint8-array.ts';

describe('bytes/toUint8Array', () => {
  it('views a `Buffer` as a plain `Uint8Array` without copying', () => {
    const buffer = Buffer.from('Hi');
    const result = toUint8Array(buffer);

    expect(result.constructor).toBe(Uint8Array);
    expect(result).toStrictEqual(new Uint8Array([72, 105]));
    expect(result.buffer).toBe(buffer.buffer);
  });

  it('views other typed arrays, `ArrayBuffer`s and `DataView`s', () => {
    const bytes = new Uint8Array([1, 2, 3, 4]);

    expect(toUint8Array(bytes.buffer)).toStrictEqual(bytes);
    expect(toUint8Array(new DataView(bytes.buffer, 1, 2))).toStrictEqual(new Uint8Array([2, 3]));
    expect(toUint8Array(new Uint32Array([1]))).toHaveLength(4);
  });

  it('throws for other values', () => {
    // @ts-expect-error -- testing invalid input
    expect(() => toUint8Array([1])).toThrow(TypeError);
  });
});
