// The scheme and the user info (`user:password@`) of an absolute URL: the user info ends at the
// last `@` before the path, as URL parsers read it
const URL_CREDENTIALS_REGEX = /^([a-z][\d+\-.a-z]*:\/\/)[^#/?]*@/i;

/**
 * Hides the credentials (`user:password@` or a token like `token@`) of a URL,
 * replacing them with `***`, so that the URL can be logged or shown in an error
 * message.
 * The rest of the URL is kept as is; a URL without credentials is returned
 * unchanged.
 * @param url - The URL (a string or a `URL` object).
 * @returns The URL with its credentials replaced with `***`.
 * @example
 * redactUrlCredentials('https://user:secret@registry.example.com/package');
 * // 'https://***@registry.example.com/package'
 * redactUrlCredentials('git+https://ghp_token@github.com/owner/repo.git');
 * // 'git+https://***@github.com/owner/repo.git'
 * redactUrlCredentials('https://example.com/a@b');
 * // 'https://example.com/a@b'
 */
export const redactUrlCredentials = (url: string | URL) =>
  String(url).replace(URL_CREDENTIALS_REGEX, '$1***@');
