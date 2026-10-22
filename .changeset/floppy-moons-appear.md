---
'unutils': minor
---

`createSingletonPromise` no longer keeps a rejection by default, so the next call tries again (pass `{cacheRejections: true}` for the old behavior), and gets a `ttl` option
