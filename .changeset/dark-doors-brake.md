---
'utilery': minor
---

Updated [`ansi-regex` from v6.4.0 to v6.6.0](https://github.com/chalk/ansi-regex/compare/v6.4.0...v6.6.0), which affected:

- `stripAnsi`:
  - **BREAKING:** escape codes are now matched by their standard form, which changes what is removed:
    - Whole control strings (device control strings, application program commands, privacy messages and similar) are now removed together with their content
    - Control sequences with any standard parameter, intermediate and final bytes, like `\u001B[2 q` or `\u001B[>1u`, are now removed whole, instead of leaving their tail in the text
    - An escape code that ends with a digit, like `\u001B7`, no longer takes the next character with it
    - Text that only looks like an escape code, like a control string that has no end, is now kept as is
- `getStringWidth`:
  - **BREAKING:** the same change as in `stripAnsi`, for the escape codes that the width leaves out
- `wrapText`:
  - **BREAKING:** control sequences with intermediate bytes or unusual final bytes, like `\u001B[2 q`, no longer add to the width of a line