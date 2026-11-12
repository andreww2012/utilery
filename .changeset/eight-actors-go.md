---
'utilery': patch
---

Fixed `reduce` not closing the iterator when the reducer throws, so the `finally` blocks of a generator didn't run
