---
'unutils': minor
---

Added a new `net` group for IP addresses, based on [`ipaddr.js`](https://npmx.dev/ipaddr.js):

- `isIpv4` and `isIpv6` ([`IPv4.isValidFourPartDecimal`][api] and [`IPv6.isValid`][api], strict about embedded IPv4 addresses too) and `isIp`
- `getIpRange` (based on [`process`][api]), which tells whether an address is private, loopback, link-local, etc.
- `isLocalhost`

[api]: https://github.com/whitequark/ipaddr.js#api
