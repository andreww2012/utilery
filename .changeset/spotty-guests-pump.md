---
'unutils': minor
---

Added a new `http` group for parsing and formatting HTTP headers:

- `parseRetryAfter`
- `parseLinkHeader` ([`Link.parse`](https://github.com/jhermsmeier/node-http-link-header#usage) from [`http-link-header`](https://npmx.dev/http-link-header))
- `parseCacheControl` and `formatCacheControl` ([`parse`](https://github.com/tusbar/cache-control#parseheader) and [`format`](https://github.com/tusbar/cache-control#formatcachecontrol) from [`@tusbar/cache-control`](https://npmx.dev/@tusbar/cache-control))
- `parseRangeHeader` ([`rangeParser`](https://github.com/jshttp/range-parser#api) from [`range-parser`](https://npmx.dev/range-parser))
- `getPreferredEncoding` ([`encoding`](https://github.com/jshttp/negotiator#accept-encoding-negotiation) from [`negotiator`](https://npmx.dev/negotiator))
