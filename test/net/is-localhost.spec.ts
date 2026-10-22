// cspell:ignore notlocalhost
import {isLocalhost} from '../../src/net/is-localhost.ts';

describe('net/isLocalhost', () => {
  it('accepts `localhost` and its subdomains', () => {
    expect(isLocalhost('localhost')).toBe(true);
    expect(isLocalhost('LOCALHOST')).toBe(true);
    expect(isLocalhost('localhost.')).toBe(true);
    expect(isLocalhost('app.localhost')).toBe(true);
  });

  it('accepts loopback addresses', () => {
    expect(isLocalhost('127.0.0.1')).toBe(true);
    expect(isLocalhost('127.255.0.1')).toBe(true);
    expect(isLocalhost('::1')).toBe(true);
    expect(isLocalhost('[::1]')).toBe(true);
    expect(isLocalhost(new URL('http://[::1]:3000/').hostname)).toBe(true);
    expect(isLocalhost('::ffff:127.0.0.1')).toBe(true);
  });

  it('rejects other hosts', () => {
    expect(isLocalhost('example.com')).toBe(false);
    expect(isLocalhost('localhost.example.com')).toBe(false);
    expect(isLocalhost('notlocalhost')).toBe(false);
    expect(isLocalhost('0.0.0.0')).toBe(false);
    expect(isLocalhost('192.168.0.1')).toBe(false);
    expect(isLocalhost('')).toBe(false);
  });
});
