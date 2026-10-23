const DELAY_SECONDS_REGEX = /^\d+$/;
// Every HTTP date format starts with the name of the day
const HTTP_DATE_START_REGEX = /^[a-z]/i;

/**
 * Parses the `Retry-After` HTTP header, sent with `429 Too Many Requests` or
 * `503 Service Unavailable` responses, into the number of milliseconds to wait
 * before retrying.
 *
 * The header holds either a number of seconds (`'120'`) or an HTTP date
 * (`'Wed, 21 Oct 2026 07:28:00 GMT'`); a date in the past gives `0`.
 * @param header - The header value (`null` and `undefined` are accepted, as returned by
 * `Headers#get`).
 * @param now - The current time, to compare a date against (defaults to `Date.now()`).
 * @returns The delay in milliseconds, or `undefined` if the header is missing or invalid.
 * @example
 * parseRetryAfter('120');
 * // 120_000
 * parseRetryAfter('Wed, 21 Oct 2026 07:28:00 GMT', Date.parse('Wed, 21 Oct 2026 07:27:00 GMT'));
 * // 60_000
 * @example
 * // Wait before retrying a rate-limited request
 * if (response.status === 429) {
 *   await sleep(parseRetryAfter(response.headers.get('retry-after')) ?? 1000);
 * }
 */
export const parseRetryAfter = (
  header: string | null | undefined,
  now = Date.now(),
): number | undefined => {
  const value = header?.trim() || '';
  if (DELAY_SECONDS_REGEX.test(value)) {
    return Number(value) * 1000;
  }

  const date = HTTP_DATE_START_REGEX.test(value) ? Date.parse(value) : Number.NaN;
  return Number.isNaN(date) ? undefined : Math.max(0, date - now);
};
