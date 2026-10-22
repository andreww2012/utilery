import {execFileSync} from 'node:child_process';
import {quoteShellArgument} from '../../src/server/quote-shell-argument.ts';

describe('server/quoteShellArgument', () => {
  it('quotes for POSIX shells', () => {
    expect(quoteShellArgument('simple', {platform: 'linux'})).toBe('simple');
    expect(quoteShellArgument('file name.txt', {platform: 'linux'})).toBe("'file name.txt'");
    expect(quoteShellArgument("it's", {platform: 'darwin'})).toBe(String.raw`'it'\''s'`);
    expect(quoteShellArgument('$HOME', {platform: 'linux'})).toBe("'$HOME'");
    expect(quoteShellArgument('', {platform: 'linux'})).toBe("''");
    expect(quoteShellArgument('simple', {platform: 'linux', force: true})).toBe("'simple'");
  });

  it('quotes for `cmd.exe`', () => {
    expect(quoteShellArgument('simple', {platform: 'win32'})).toBe('simple');
    expect(quoteShellArgument('file name.txt', {platform: 'win32'})).toBe('"file name.txt"');
    expect(quoteShellArgument('a&b', {platform: 'win32'})).toBe('"a&b"');
    expect(quoteShellArgument('', {platform: 'win32'})).toBe('""');
    expect(() => quoteShellArgument('a\nb', {platform: 'win32'})).toThrow(Error);
  });

  it.skipIf(process.platform === 'win32')('passes the argument through a real shell', () => {
    const argument = String.raw`it's "quoted" $HOME \ & | ; *`;
    const output = execFileSync('/bin/sh', [
      '-c',
      `printf %s ${quoteShellArgument(argument)}`,
    ]).toString();

    expect(output).toBe(argument);
  });
});
