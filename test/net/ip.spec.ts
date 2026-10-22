import {isIp} from '../../src/net/is-ip.ts';
import {isIpv4} from '../../src/net/is-ipv4.ts';
import {isIpv6} from '../../src/net/is-ipv6.ts';

describe('net/isIpv4, net/isIpv6, net/isIp', () => {
  it('accepts IPv4 addresses in the standard form only', () => {
    expect(isIpv4('192.168.0.1')).toBe(true);
    expect(isIpv4('0.0.0.0')).toBe(true);
    expect(isIpv4('256.0.0.1')).toBe(false);
    expect(isIpv4('127.1')).toBe(false);
    expect(isIpv4('0x7f.0.0.1')).toBe(false);
    expect(isIpv4('::1')).toBe(false);
  });

  it('accepts IPv6 addresses', () => {
    expect(isIpv6('2001:db8::1')).toBe(true);
    expect(isIpv6('::1')).toBe(true);
    expect(isIpv6('::ffff:192.168.0.1')).toBe(true);
    expect(isIpv6('fe80::1%eth0')).toBe(true);
    expect(isIpv6('[::1]')).toBe(false);
    expect(isIpv6('192.168.0.1')).toBe(false);
    expect(isIpv6('2001:db8::g')).toBe(false);
  });

  it('accepts both kinds', () => {
    expect(isIp('192.168.0.1')).toBe(true);
    expect(isIp('::1')).toBe(true);
    expect(isIp('example.com')).toBe(false);
    expect(isIp('')).toBe(false);
  });

  it('accepts an embedded IPv4 address in the standard form only', () => {
    expect(isIpv6('::ffff:127.0.0.1')).toBe(true);
    expect(isIpv6('::ffff:127.0.0.1%eth0')).toBe(true);
    expect(isIpv6('::ffff:0x7f.0.0.1')).toBe(false);
    expect(isIpv6('::ffff:127.0.0.01')).toBe(false);
    expect(isIpv6('::ffff:0177.0.0.1')).toBe(false);
    expect(isIp('::ffff:0177.0.0.1')).toBe(false);
  });
});
