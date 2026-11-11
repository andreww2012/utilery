---
'utilery': patch
---

Moved the bundled packages from `dist/node_modules/.pnpm/<store directory>/node_modules/<package>/` to `dist/vendor/<package>/`. This change helps Windows tools that fail on paths longer than 260 characters, and other bundles show shorter paths in their comments
