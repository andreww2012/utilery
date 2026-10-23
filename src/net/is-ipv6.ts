import ipaddr from 'ipaddr.js';
import {isIpv4} from './is-ipv4.ts';

/**
 * Checks whether a string is an IPv6 address, like `'2001:db8::1'`, including the compressed form
 * (`'::1'`), an embedded IPv4 address (`'::ffff:192.168.0.1'`, in the strict form `isIpv4` accepts)
 * and a zone ID (`'fe80::1%eth0'`).
 * Square brackets, as in URLs (`'[::1]'`), are not accepted.
 * @param value - The string to check.
 * @returns `true` if the string is an IPv6 address, otherwise `false`.
 * @example
 * isIpv6('2001:db8::1');
 * // true
 * isIpv6('::ffff:192.168.0.1');
 * // true
 * isIpv6('192.168.0.1');
 * // false
 */
export const isIpv6 = (value: string): boolean => {
  if (!ipaddr.IPv6.isValid(value)) {
    return false;
  }

  // An embedded IPv4 address (`::ffff:127.0.0.1`) is the last part, before an optional zone ID
  const zoneIdStart = value.indexOf('%');
  const address = zoneIdStart === -1 ? value : value.slice(0, zoneIdStart);
  const lastPart = address.slice(address.lastIndexOf(':') + 1);
  return !lastPart.includes('.') || isIpv4(lastPart);
};
