---
'utilery': patch
---

Made the utilities that only read a `Map` or a `Set` accept a `ReadonlyMap` or a `ReadonlySet`, which they also pass to the callbacks:

- `mapEvery`
- `mapFilter`
- `mapFindKey`
- `mapFindValue`
- `mapForEach`
- `mapHasValue`
- `mapMapKeys`
- `mapMapValues`
- `mapReduce`
- `mapSome`
- `setFilter`
- `setMapValues`
