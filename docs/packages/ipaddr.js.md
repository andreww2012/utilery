# Package: [`ipaddr.js`](https://npmx.dev/ipaddr.js)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

The `net` group / `utilery/net`.

| Original function group and name                                                                                            | Status | Our function group and name | Notes                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------- | ----------------------------------------------------------------------------------- |
| [`IPv4.isValidFourPartDecimal`][api]                                                                                        | ✅     | `net/isIpv4`                | Renamed                                                                             |
| [`IPv6.isValid`][api]                                                                                                       | ✅     | `net/isIpv6`                | Renamed; an embedded IPv4 address must be in the standard form too (like `isIpv4`)  |
| `IPv4.isValidFourPartDecimal` + `IPv6.isValid`                                                                              | ✅     | `net/isIp`                  | Consolidated                                                                        |
| [`process`][api] + `range()`                                                                                                | ✅     | `net/getIpRange`            | Consolidated; `undefined` for a string that is not an IP address                    |
| `IPv4#range`, `IPv6#range` return types                                                                                     | ✅     | `net/IpRange`               | Reused (exposed by a patch), plus the ranges the package returns but its types miss |
| `isValid`, `IPv4.isValid`                                                                                                   | ❌     | `net/isIp`                  | Also accept non-standard IPv4 forms (`127.1`, `0x7f.0.0.1`); ours are strict        |
| `isValidCIDR`, `parseCIDR`, `IPv4.isValidCIDR`, `IPv6.isValidCIDR`, `IPv4.isValidCIDRFourPartDecimal`                       | ⌛     | -                           | Not added yet                                                                       |
| `parse`, `IPv4.parse`, `IPv6.parse`, `fromByteArray`, `subnetMatch`                                                         | ⌛     | -                           | Not added yet                                                                       |
| `IPv4.broadcastAddressFromCIDR`, `IPv4.networkAddressFromCIDR`, `IPv4.subnetMaskFromPrefixLength` and their `IPv6` versions | ⌛     | -                           | Not added yet                                                                       |
| `IPv4`, `IPv6` classes and their methods (`match`, `kind`, `toNormalizedString`, etc.)                                      | ⌛     | -                           | Not added yet                                                                       |

[api]: https://github.com/whitequark/ipaddr.js#api
