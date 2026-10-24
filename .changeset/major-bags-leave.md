---
'utilery': minor
---

`omit`: a `*` deep path segment now matches every element of an array or property of an object, e.g. `users.*.password` removes `password` from every user. Deep paths also no longer mutate the input when they go through an array, e.g. `omit(object, ['users.0.password'])`
