import {formatTerminalFileLink} from '../../src/server/format-terminal-file-link.ts';
import {formatTerminalLink} from '../../src/server/format-terminal-link.ts';
import {isTerminalLinkSupported} from '../../src/server/is-terminal-link-supported.ts';

describe('server/formatTerminalLink', () => {
  it('wraps the label in OSC 8 escapes when enabled', () => {
    expect(formatTerminalLink('docs', 'https://example.com', {enabled: true})).toBe(
      '\u{1B}]8;;https://example.com\u{7}docs\u{1B}]8;;\u{7}',
    );
    expect(formatTerminalLink('docs', 'https://example.com', {enabled: true, id: 'x'})).toBe(
      '\u{1B}]8;id=x;https://example.com\u{7}docs\u{1B}]8;;\u{7}',
    );
  });

  it('returns the label alone when disabled or unsupported', () => {
    expect(formatTerminalLink('docs', 'https://example.com', {enabled: false})).toBe('docs');
    expect(formatTerminalLink('docs', 'https://example.com', {stream: {isTTY: false}})).toBe(
      'docs',
    );
  });
});

describe('server/formatTerminalFileLink', () => {
  it('links a file with a `cwd`-relative label and position', () => {
    expect(
      formatTerminalFileLink('/repo/src/index.ts', {
        cwd: '/repo',
        line: 12,
        column: 3,
        enabled: true,
      }),
    ).toBe('\u{1B}]8;;file:///repo/src/index.ts#L12,3\u{7}src/index.ts:12:3\u{1B}]8;;\u{7}');
  });

  it('supports a custom label', () => {
    expect(
      formatTerminalFileLink('/repo/a.ts', {
        cwd: '/repo',
        enabled: false,
        formatter: (absolutePath) => absolutePath.toUpperCase(),
      }),
    ).toBe('/REPO/A.TS');
  });

  it('links to the file and the position whatever the custom label is', () => {
    expect(
      formatTerminalFileLink('/repo/a.ts', {
        cwd: '/repo',
        enabled: true,
        line: 2,
        formatter: () => 'here',
      }),
    ).toBe('\u{1B}]8;;file:///repo/a.ts#L2\u{7}here\u{1B}]8;;\u{7}');
  });
});

describe('server/isTerminalLinkSupported', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('follows `FORCE_HYPERLINK`', () => {
    vi.stubEnv('FORCE_HYPERLINK', '1');

    expect(isTerminalLinkSupported({isTTY: false})).toBe(true);

    vi.stubEnv('FORCE_HYPERLINK', '0');

    expect(isTerminalLinkSupported({isTTY: true})).toBe(false);
  });

  it('needs a terminal', () => {
    vi.stubEnv('FORCE_HYPERLINK', undefined);

    expect(isTerminalLinkSupported({isTTY: false})).toBe(false);
  });
});
