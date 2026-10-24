---
'utilery': minor
---

Added a new `bitwise` group for bit flags and other bit manipulation of 32-bit integers. Bit indexes are typed as `BitIndex` (an integer from 0 to 31), so out-of-range literals and enum members fail at compile time, and `isBitIndex` checks dynamic numbers:

- `BitIndex`, `isBitIndex`, `isBitSet` and `indexesOfSetBits`
- from [`@thi.ng/binary`](https://npmx.dev/@thi.ng/binary):
  - `setBit` ([`bitSet`](https://docs.thi.ng/umbrella/binary/functions/bitSet.html), or [`bitClear`](https://docs.thi.ng/umbrella/binary/functions/bitClear.html) when `false` is passed)
  - `clearBit` ([`bitClear`](https://docs.thi.ng/umbrella/binary/functions/bitClear.html))
  - `toggleBit` ([`bitFlip`](https://docs.thi.ng/umbrella/binary/functions/bitFlip.html))
  - `countSetBits` ([`popCount`](https://docs.thi.ng/umbrella/binary/variables/popCount.html))
  - `countTrailingZeroBits` ([`ctz32`](https://docs.thi.ng/umbrella/binary/variables/ctz32.html))
  - `rotateBitsLeft` ([`rotateLeft`](https://docs.thi.ng/umbrella/binary/functions/rotateLeft.html)) and `rotateBitsRight` ([`rotateRight`](https://docs.thi.ng/umbrella/binary/functions/rotateRight.html))
  - `toInt32` ([`u32i32`](https://docs.thi.ng/umbrella/binary/variables/u32i32.html)) and `toUint32` ([`i32u32`](https://docs.thi.ng/umbrella/binary/variables/i32u32.html))
