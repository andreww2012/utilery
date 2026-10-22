import {stringToUint8Array} from '../../src/bytes/string-to-uint8-array.ts';

describe('bytes/stringToUint8Array', () => {
  it('encodes a string as UTF-8', () => {
    expect(stringToUint8Array('Hello')).toStrictEqual(new Uint8Array([72, 101, 108, 108, 111]));
    expect(stringToUint8Array('€')).toStrictEqual(new Uint8Array([226, 130, 172]));
    expect(stringToUint8Array('')).toStrictEqual(new Uint8Array());
  });
});
