// cspell:ignore neighbo neighborino
import {truncate} from '../../src/string/truncate.ts';
import {EXPLICIT_UNDEFINED} from '../exact-optional-property-types.ts';

describe('string/truncate', () => {
  it('truncates the end by default', () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe('hi-diddly-ho there, neighbo...');
    expect(truncate('hi-diddly-ho there, neighborino', {length: 24, separator: ' '})).toBe(
      'hi-diddly-ho there,...',
    );
    expect(truncate('ABC', {length: 3})).toBe('ABC');
    expect(truncate('ABC', {length: 2})).toBe('...');
  });

  it('truncates the start', () => {
    expect(
      truncate('/home/user/projects/utilery/src/index.ts', {
        length: 20,
        position: 'start',
        omission: '…',
      }),
    ).toBe('…tilery/src/index.ts'); // cspell:disable-line
    expect(truncate('ABCDEF', {length: 5, position: 'start'})).toBe('...EF');
  });

  it('truncates the middle', () => {
    expect(
      truncate('a-very-long-file-name.tar.gz', {length: 15, position: 'middle', omission: '…'}),
    ).toBe('a-very-….tar.gz');
    expect(truncate('ABCDEFGH', {length: 6, position: 'middle'})).toBe('AB...H');
  });

  it('returns strings that fit as is', () => {
    expect(truncate('short', {position: 'middle'})).toBe('short');
    expect(truncate('ABC', {length: 3, position: 'start'})).toBe('ABC');
  });

  it('does not split emoji', () => {
    expect(truncate('😀😀😀😀', {length: 3, position: 'start', omission: '…'})).toBe('…😀😀');
    expect(truncate('😀😀😀😀', {length: 3, position: 'middle', omission: '…'})).toBe('😀…😀');
  });

  it('gives only the omission when nothing fits, even if it is longer than `length`', () => {
    expect(truncate('ABCDEF', {length: 2})).toBe('...');
    expect(truncate('ABCDEF', {length: 2, position: 'start'})).toBe('...');
    expect(truncate('ABCDEF', {length: 2, position: 'middle'})).toBe('...');
    expect(truncate('ABCDEF', {length: 0, omission: '…'})).toBe('…');
    expect(truncate('A', {length: 2})).toBe('A');
  });

  it('handles a length with a decimal part or `NaN` the same way at every position', () => {
    expect(truncate('ABCDEFGH', {length: 5.5})).toBe('AB...');
    expect(truncate('ABCDEFGH', {length: 5.5, position: 'start'})).toBe('...GH');
    expect(truncate('ABCDEFGH', {length: 5.5, position: 'middle'})).toBe('A...H');
    expect(truncate('ABCDEF', {length: Number.NaN})).toBe('...');
    expect(truncate('ABCDEF', {length: Number.NaN, position: 'start'})).toBe('...');
    expect(truncate('ABCDEF', {length: Number.NaN, position: 'middle'})).toBe('...');
  });

  it('treats options set to `undefined` like missing ones', () => {
    expect(truncate('hello world', {length: 8, omission: EXPLICIT_UNDEFINED})).toBe('hello...');
    expect(truncate('hello world', {length: 8, position: EXPLICIT_UNDEFINED})).toBe('hello...');
  });
});
