import ipaddr from 'ipaddr.js';
import type {IPv4Range, IPv6Range} from 'ipaddr.js/lib/ranges';
import {isIp} from './is-ip.ts';

/** The kind of network an IP address belongs to, as returned by `getIpRange` */
export type IpRange =
  | IPv4Range
  | IPv6Range
  // Returned by the package, but missing from its types
  | 'deprecatedOrchid'
  | 'deprecatedSiteLocal'
  | 'discard'
  | 'segmentRouting';

/**
 * Gets the kind of network an IP address belongs to, by its reserved range:
 * `'loopback'` (`127.0.0.0/8`, `::1`), `'private'` (`10.0.0.0/8`,
 * `192.168.0.0/16`, etc.), `'uniqueLocal'` (the IPv6 private range,
 * `fc00::/7`), `'linkLocal'` (`169.254.0.0/16`, `fe80::/10`), `'unspecified'`
 * (`0.0.0.0`, `::`), `'multicast'`, `'reserved'` (documentation, testing and
 * other special ranges), and others.
 * Publicly routable addresses give `'unicast'`.
 *
 * An IPv4 address mapped to IPv6 (`'::ffff:127.0.0.1'`) is classified as the
 * IPv4 address.
 * Useful to block requests to internal addresses, for example against
 * server-side request forgery (SSRF).
 * @param ip - The IP address (see `isIp` for the accepted forms).
 * @returns The range name, or `undefined` if the string is not an IP address.
 * @example
 * getIpRange('127.0.0.1');
 * // 'loopback'
 * getIpRange('192.168.1.10');
 * // 'private'
 * getIpRange('8.8.8.8');
 * // 'unicast'
 * getIpRange('::ffff:10.0.0.1');
 * // 'private'
 * @example
 * // Only allow public addresses
 * if (getIpRange(address) !== 'unicast') {
 *   throw new Error('Requests to internal addresses are not allowed');
 * }
 */
// Annotated to include the ranges listed in `IpRange` that the types of the package miss
export const getIpRange = (ip: string): IpRange | undefined =>
  isIp(ip) ? ipaddr.process(ip).range() : undefined;
