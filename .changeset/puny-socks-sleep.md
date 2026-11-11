---
'utilery': patch
---

Fixed `truncate` with `position: 'start'` or `'middle'` for a `length` with a decimal part or `NaN`, which kept one character too many or the whole string: it now ignores the decimal part and keeps nothing for `NaN`, like the default `'end'` position
