<!-- cspell:ignore Nand Xnor Demux -->

# Package: [`@thi.ng/binary`](https://npmx.dev/@thi.ng/binary)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

Bit manipulation of 32-bit integers.
Like the package's `Bit`, our `bitwise/BitIndex` type limits bit indexes and rotation counts to integers from `0` to `31`, so out-of-range literals and enum members fail at compile time instead of silently addressing a wrong bit.
`bitwise/isBitIndex` narrows dynamic numbers to it.
Most of the package targets low-level graphics and signal processing work (color channels, byte lanes, logic gates), which is out of scope.

| Original function group and name                                                    | Status | Our function group and name     | Notes                                                                                                                           |
| ----------------------------------------------------------------------------------- | ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [`bitSet`][bitSet]                                                                  | ✅     | `bitwise/setBit`                | Renamed (`bitSet` reads like the data structure); consolidated with `bitClear`: pass `false` as the third argument              |
| [`bitClear`][bitClear]                                                              | ✅     | `bitwise/clearBit`              | Renamed; also reachable via `setBit(value, bit, false)`                                                                         |
| [`bitFlip`][bitFlip]                                                                | ✅     | `bitwise/toggleBit`             | Renamed                                                                                                                         |
| [`popCount`][popCount]                                                              | ✅     | `bitwise/countSetBits`          | Renamed                                                                                                                         |
| [`ctz32`][ctz32]                                                                    | ✅     | `bitwise/countTrailingZeroBits` | Renamed                                                                                                                         |
| [`rotateLeft`][rotateLeft]                                                          | ✅     | `bitwise/rotateBitsLeft`        | Renamed                                                                                                                         |
| [`rotateRight`][rotateRight]                                                        | ✅     | `bitwise/rotateBitsRight`       | Renamed                                                                                                                         |
| [`u32i32`][u32i32]                                                                  | ✅     | `bitwise/toInt32`               | Renamed                                                                                                                         |
| [`i32u32`][i32u32]                                                                  | ✅     | `bitwise/toUint32`              | Renamed                                                                                                                         |
| `bitSetWindow`                                                                      | ❌     | -                               | Shifts the new bits by a wrong amount (`bitSetWindow(0, 0b1111, 4, 8)` gives `0` instead of `0b1111_0000`)                      |
| `bitClearWindow`                                                                    | ❌     | -                               | Niche; `value & ~mask`                                                                                                          |
| `hammingDist`                                                                       | ❌     | *(use `bitwise/countSetBits`)*  | Just `countSetBits(a ^ b)`; the name also suggests strings                                                                      |
| `popCountArray`                                                                     | ❌     | -                               | Niche; sum `countSetBits` over the array                                                                                        |
| `clz32`                                                                             | ❌     | *(native)*                      | `Math.clz32`                                                                                                                    |
| `bitSize`                                                                           | ❌     | -                               | Its docs promise the number of bits needed to encode `x`, but it gives `Math.ceil(Math.log2(x))`, which is 3 for `8`            |
| `isPow2`, `ceilPow2`, `floorPow2`                                                   | ❌     | -                               | Only correct for 32-bit integers (`isPow2(2.5)` is `true`); power-of-two helpers belong in `math` and should work on any number |
| `binaryOneHot`, `oneHotBinary`                                                      | ❌     | -                               | Trivial `1 << index`; `bitwise/countTrailingZeroBits` gives the index of a single set bit                                       |
| `defMask`, `maskL`, `maskH`                                                         | ❌     | -                               | Niche                                                                                                                           |
| `MASKS`, `MSB_BITS*`                                                                | ❌     | -                               | Lookup tables for the mask helpers                                                                                              |
| `bitNot`, `bitAnd`, `bitOr`, `bitXor`, `bitNand`, `bitNor`, `bitXnor`, `bitImply`   | ❌     | *(native)*                      | Bitwise operators (`~`, `&`, `\|`, `^`) or their negations                                                                      |
| `bitAoi*`, `bitOai*`, `bitMux`, `bitDemux`                                          | ❌     | -                               | Logic gate emulation; niche                                                                                                     |
| `bit*M` (e.g. `bitAndM`)                                                            | ❌     | -                               | Logic operations masked to the lowest N bits; niche                                                                             |
| `shiftRL`                                                                           | ❌     | -                               | Niche; `n < 0 ? x << -n : x >>> n`                                                                                              |
| `i8u8`, `i16u16`, `u8i8`, `u16i16`, `u24i24`                                        | ❌     | -                               | Niche 8/16/24-bit conversions; typed arrays cover most cases                                                                    |
| `encodeGray32`, `decodeGray32`                                                      | ❌     | -                               | Gray code; niche                                                                                                                |
| `floatTo*Bits*`, `*BitsToFloat*`, `floatToSortableInt`                              | ❌     | -                               | Niche; typed arrays sharing a buffer do the same                                                                                |
| `f32u*`, `u*f32`                                                                    | ❌     | -                               | Normalized float and integer conversions for color channels; niche                                                              |
| `bytes*`                                                                            | ❌     | -                               | Splitting numbers into bytes; niche, `DataView` covers it                                                                       |
| `lane*`, `setLane*`, `swizzle*`, `swapLane*`, `mux`, `flip8`, `flip16`, `flipBytes` | ❌     | -                               | Byte and nibble lane access within an integer; niche                                                                            |
| `splat*`, `same4`, `same8`, `interleave*`                                           | ❌     | -                               | Repeating bit patterns for color values; niche                                                                                  |
| `align`, `isAligned`                                                                | ❌     | -                               | Memory address alignment; niche                                                                                                 |
| `IS_LE`, `DATAVIEW`                                                                 | ❌     | -                               | Endianness detection internals                                                                                                  |
| `F32`, `F64`, `I8`, `U8`, `I16`, `U16`, `I32`, `U32`, `I64`, `U64`                  | ❌     | -                               | Shared typed array views used internally                                                                                        |
| `Bit`                                                                               | ❌     | `bitwise/BitIndex`              | Same union, declared on our side                                                                                                |
| `Lane*`, `Pow2`                                                                     | ❌     | -                               | Literal union types of valid arguments of the utilities we don't add                                                            |

[bitSet]: https://docs.thi.ng/umbrella/binary/functions/bitSet.html
[bitClear]: https://docs.thi.ng/umbrella/binary/functions/bitClear.html
[bitFlip]: https://docs.thi.ng/umbrella/binary/functions/bitFlip.html
[popCount]: https://docs.thi.ng/umbrella/binary/variables/popCount.html
[ctz32]: https://docs.thi.ng/umbrella/binary/variables/ctz32.html
[rotateLeft]: https://docs.thi.ng/umbrella/binary/functions/rotateLeft.html
[rotateRight]: https://docs.thi.ng/umbrella/binary/functions/rotateRight.html
[u32i32]: https://docs.thi.ng/umbrella/binary/variables/u32i32.html
[i32u32]: https://docs.thi.ng/umbrella/binary/variables/i32u32.html
