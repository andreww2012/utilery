import {regexTyped, type RegexTyped} from 'utilery/regex';

const complex: RegexTyped<`id-${string}`, {captures: [string]}> = regexTyped.as<
  `id-${string}`,
  {captures: [string]}
>('id-(.+)');
void complex;
