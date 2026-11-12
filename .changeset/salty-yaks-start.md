---
'utilery': patch
---

Fixed the types of `flow` and `flowAsync`, which made the composed function accept only `never` arguments: it now takes the parameters of the function that runs first and gives the result of the one that runs last
