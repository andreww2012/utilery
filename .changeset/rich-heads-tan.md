---
'unutils': minor
---

Added new `isFile`, `isDirectory` and `isSymlink` utilities and their `*Sync` versions ([`isFile`][api], [`isDirectory`][api], [`isSymlink`][api], etc. from [`path-type`](https://npmx.dev/path-type)), which give `false` for a missing path, and a new `pathExistsSync` utility

[api]: https://github.com/sindresorhus/path-type#api
