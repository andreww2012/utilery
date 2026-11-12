---
'utilery': minor
---

Added `arrayIndexOf`, `arrayLastIndexOf` and `mapHas`, typed versions of `Array.prototype.indexOf`, `Array.prototype.lastIndexOf` and `Map.prototype.has`. The first two accept a value of a type wider than the element type, and `mapHas` is a type guard that narrows the key to the key type of the map
