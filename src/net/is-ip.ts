import {isIpv4} from './is-ipv4.ts';
import {isIpv6} from './is-ipv6.ts';

/**
 * Checks whether a string is an IP address: IPv4 in the standard dotted decimal
 * form (see `isIpv4`) or IPv6 (see `isIpv6`).
 * Works in any environment, unlike Node's `net.isIP`.
 * @param value - The string to check.
 * @returns `true` if the string is an IP address, otherwise `false`.
 * @example
 * isIp('192.168.0.1');
 * // true
 * isIp('::1');
 * // true
 * isIp('example.com');
 * // false
 */
export const isIp = (value: string) => isIpv4(value) || isIpv6(value);
