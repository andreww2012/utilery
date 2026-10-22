import {getIpRange} from '../../src/net/get-ip-range.ts';

describe('net/getIpRange', () => {
  it('classifies IPv4 addresses', () => {
    expect(getIpRange('127.0.0.1')).toBe('loopback');
    expect(getIpRange('10.1.2.3')).toBe('private');
    expect(getIpRange('192.168.1.10')).toBe('private');
    expect(getIpRange('172.16.0.1')).toBe('private');
    expect(getIpRange('169.254.169.254')).toBe('linkLocal');
    expect(getIpRange('0.0.0.0')).toBe('unspecified');
    expect(getIpRange('8.8.8.8')).toBe('unicast');
  });

  it('classifies IPv6 addresses, unwrapping mapped IPv4 ones', () => {
    expect(getIpRange('::1')).toBe('loopback');
    expect(getIpRange('fd00::1')).toBe('uniqueLocal');
    expect(getIpRange('fe80::1')).toBe('linkLocal');
    expect(getIpRange('2606:4700::1')).toBe('unicast');
    expect(getIpRange('::ffff:127.0.0.1')).toBe('loopback');
    expect(getIpRange('::ffff:10.0.0.1')).toBe('private');
  });

  it('returns `undefined` for other strings', () => {
    expect(getIpRange('example.com')).toBeUndefined();
    expect(getIpRange('127.1')).toBeUndefined();
  });
});
