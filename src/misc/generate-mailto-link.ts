import {arrayify} from '../array/arrayify.ts';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

const joinRecipients = (value: MaybeReadonlyArray<string> | undefined) =>
  arrayify(value).filter(Boolean).join(',');

/**
 * Builds a `mailto:` link from a set of recipients and message fields,
 * percent-encoding every header value so the result is a valid URL usable
 * directly as an `href`.
 *
 * By default the primary recipients are placed in the link's path
 * (`mailto:a@x.com,b@x.com?subject=...`), the canonical form understood by every
 * mail client.
 * Set `recipientsAsQueryParam` to instead emit them as a `to` query parameter
 * (`mailto:?to=a@x.com&subject=...`); `cc` and `bcc` are always query
 * parameters.
 * Each recipient field accepts a single address or an array, and empty or
 * nullish entries are dropped.
 * With no fields set, a bare `mailto:` is returned.
 * @param options - The link fields.
 * @param options.to - Primary recipient address(es).
 * @param options.cc - Carbon-copy recipient address(es).
 * @param options.bcc - Blind-carbon-copy recipient address(es).
 * @param options.subject - Subject line.
 * @param options.body - Message body.
 * @param options.recipientsAsQueryParam - Emit the primary recipients as a `to`
 * query parameter instead of in the path.
 * Defaults to `false`.
 * @returns The assembled `mailto:` link.
 * @example
 * // Recipient in the path (canonical form)
 * generateMailtoLink({to: 'ada@example.com', subject: 'Hi there'});
 * // 'mailto:ada@example.com?subject=Hi%20there'
 * @example
 * // Multiple recipients and a carbon copy
 * generateMailtoLink({to: ['a@example.com', 'b@example.com'], cc: 'c@example.com'});
 * // 'mailto:a@example.com,b@example.com?cc=c%40example.com'
 * @example
 * // Recipients as a query parameter
 * generateMailtoLink({to: 'ada@example.com', recipientsAsQueryParam: true});
 * // 'mailto:?to=ada%40example.com'
 * @example
 * // No fields
 * generateMailtoLink({});
 * // 'mailto:'
 */
export const generateMailtoLink = (options: {
  to?: MaybeReadonlyArray<string>;
  cc?: MaybeReadonlyArray<string>;
  bcc?: MaybeReadonlyArray<string>;
  subject?: string;
  body?: string;
  recipientsAsQueryParam?: boolean;
}): string => {
  const {subject = '', body = '', recipientsAsQueryParam = false} = options;

  const to = joinRecipients(options.to);
  const cc = joinRecipients(options.cc);
  const bcc = joinRecipients(options.bcc);

  const query = (
    [
      ['to', recipientsAsQueryParam ? to : ''],
      ['cc', cc],
      ['bcc', bcc],
      ['subject', subject],
      ['body', body],
    ] satisfies [string, string][]
  )
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `mailto:${recipientsAsQueryParam ? '' : to}${query ? `?${query}` : ''}`;
};
