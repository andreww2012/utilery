---
'utilery': patch
---

Fixed `exec` on Windows, where it failed with `ENOENT` for `.cmd` and `.bat` launchers (like `npm` and `pnpm`) and scripts with a shebang: it now runs them using the command parsing of [`cross-spawn`](https://npmx.dev/cross-spawn), and still rejects with `ENOENT` for a missing command. Also made `exec` accept a readonly array of arguments
