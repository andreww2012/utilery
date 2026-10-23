import {getIpRange} from './get-ip-range.ts';

// `localhost` and its subdomains (RFC 6761), with an optional trailing dot
const LOCALHOST_REGEX = /^(?:[^.]+\.)*localhost\.?$/i;

/**
 * Checks whether a host name points to the local machine: `localhost`, its
 * subdomains (like `app.localhost`), or a loopback IP address (`127.0.0.0/8`,
 * `::1` and their IPv4-mapped IPv6 forms).
 * IPv6 addresses in square brackets, as returned by `URL#hostname`, are
 * supported.
 * No DNS lookup is done.
 * @param hostname - The host name, without a port.
 * @returns `true` if the host name points to the local machine, otherwise `false`.
 * @example
 * isLocalhost('localhost');
 * // true
 * isLocalhost('127.0.0.1');
 * // true
 * isLocalhost(new URL('http://[::1]:3000/').hostname);
 * // true
 * isLocalhost('example.com');
 * // false
 */
export const isLocalhost = (hostname: string): boolean => {
  const host =
    hostname.startsWith('[') && hostname.endsWith(']') ? hostname.slice(1, -1) : hostname;
  return LOCALHOST_REGEX.test(host) || getIpRange(host) === 'loopback';
};
