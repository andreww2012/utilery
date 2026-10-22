import {levenshteinDistance} from '../../src/string/levenshtein-distance.ts';

describe('string/levenshteinDistance', () => {
  it('measures the edit distance', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
    expect(levenshteinDistance('cat', 'cat')).toBe(0);
    expect(levenshteinDistance('', 'abc')).toBe(3);
    expect(levenshteinDistance('Cat', 'cat')).toBe(1);
  });

  it('caps the distance at `maxDistance`', () => {
    expect(levenshteinDistance('abcdef', '123456', {maxDistance: 3})).toBe(3);
    expect(levenshteinDistance('cat', 'cow', {maxDistance: 5})).toBe(2);
  });
});
