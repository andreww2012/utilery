---
'unutils': minor
---

Added a new `sleepAbortable` utility: like `sleep`, but rejects with the reason of the aborted signal and has an `unref` option to not keep the Node.js process alive
