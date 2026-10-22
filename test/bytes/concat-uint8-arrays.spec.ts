import {concatUint8Arrays} from '../../src/bytes/concat-uint8-arrays.ts';

describe('bytes/concatUint8Arrays', () => {
  it('joins arrays and buffers in order', () => {
    expect(concatUint8Arrays([new Uint8Array([1, 2]), new Uint8Array([3]).buffer])).toStrictEqual(
      new Uint8Array([1, 2, 3]),
    );
  });

  it('gives an empty array for an empty list', () => {
    expect(concatUint8Arrays([])).toStrictEqual(new Uint8Array());
  });

  it('pads with zeros up to `totalLength`', () => {
    expect(concatUint8Arrays([new Uint8Array([1, 2])], 4)).toStrictEqual(
      new Uint8Array([1, 2, 0, 0]),
    );
  });

  it('throws when `totalLength` is too small', () => {
    expect(() => concatUint8Arrays([new Uint8Array([1, 2, 3])], 2)).toThrow(RangeError);
  });

  it('accepts a readonly tuple', () => {
    expect(concatUint8Arrays([new Uint8Array([1]), new Uint8Array([2, 3])] as const)).toStrictEqual(
      new Uint8Array([1, 2, 3]),
    );
  });
});
