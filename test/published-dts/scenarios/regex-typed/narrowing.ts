import {regexTyped} from 'utilery/regex';

const ok = regexTyped('^ok$', 'i');
const value = 'x' as string;
if (ok.test(value)) {
  const narrowed: 'ok' | 'oK' | 'Ok' | 'OK' = value;
  void narrowed;
  // @ts-expect-error narrowed union excludes 'abc' (fails if the type collapsed to `any`/`string`)
  const wrong: 'abc' = value;
  void wrong;
}
