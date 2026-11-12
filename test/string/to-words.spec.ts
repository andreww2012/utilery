import {toWords} from '../../src/string/to-words.ts';

describe('string/toWords', () => {
  it('basic test', () => {
    expect(toWords('fred, barney, & pebbles')).toStrictEqual(['fred', 'barney', 'pebbles']);
  });

  it('handles non-ASCII (accented) input', () => {
    expect(toWords('café crème')).toStrictEqual(['café', 'crème']);
  });
});
