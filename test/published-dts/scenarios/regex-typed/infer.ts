import {regexTyped} from 'utilery/regex';

type Inferred = regexTyped.infer<'^ok$', 'i'>;
const okValue: Inferred = 'oK';
void okValue;
// @ts-expect-error 'nope' is not in the inferred union (fails if `infer` widened)
const badValue: Inferred = 'nope';
void badValue;
