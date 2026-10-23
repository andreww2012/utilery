import ipaddr from 'ipaddr.js';

/**
 * Checks whether a string is an IPv4 address in the standard dotted decimal
 * form: four numbers from 0 to 255, like `'192.168.0.1'`.
 * Shorter or hexadecimal forms that some parsers accept (`'127.1'`,
 * `'0x7f.0.0.1'`) are rejected.
 * @param value - The string to check.
 * @returns `true` if the string is an IPv4 address, otherwise `false`.
 * @example
 * isIpv4('192.168.0.1');
 * // true
 * isIpv4('256.0.0.1');
 * // false
 * isIpv4('::1');
 * // false
 */
export const isIpv4 = (value: string) => ipaddr.IPv4.isValidFourPartDecimal(value);
