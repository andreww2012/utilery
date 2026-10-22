import {redactUrlCredentials} from '../../src/misc/redact-url-credentials.ts';

describe('misc/redactUrlCredentials', () => {
  it('hides the user info', () => {
    expect(redactUrlCredentials('https://user:secret@registry.example.com/package')).toBe(
      'https://***@registry.example.com/package',
    );
    expect(redactUrlCredentials('git+https://ghp_token@github.com/owner/repo.git')).toBe(
      'git+https://***@github.com/owner/repo.git',
    );
    expect(redactUrlCredentials('https://user:p@ss@host/x')).toBe('https://***@host/x');
    expect(redactUrlCredentials(new URL('https://u:p@example.com/'))).toBe(
      'https://***@example.com/',
    );
  });

  it('keeps URLs without credentials as is', () => {
    expect(redactUrlCredentials('https://example.com/a@b')).toBe('https://example.com/a@b');
    expect(redactUrlCredentials('https://example.com/?email=a@b')).toBe(
      'https://example.com/?email=a@b',
    );
    expect(redactUrlCredentials('mailto:a@example.com')).toBe('mailto:a@example.com');
    expect(redactUrlCredentials('not a url')).toBe('not a url');
  });
});
