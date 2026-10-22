---
'unutils': minor
---

`withTimeout` passes an `AbortSignal` to the function and aborts it on timeout; it rejects with a `DOMException` named `TimeoutError`, and with the abort reason when its `signal` is aborted (instead of only stopping the timer)
