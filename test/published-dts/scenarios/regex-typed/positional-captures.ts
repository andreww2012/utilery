import {regexTyped} from 'utilery/regex';

const match = regexTyped('^(\\d+)$').exec('5');
if (match) {
  const capture: `${number}` = match[1];
  void capture;
}
