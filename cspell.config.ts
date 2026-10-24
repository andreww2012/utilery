import type {CSpellSettings} from 'cspell';

const GLOBALLY_IGNORED_WORDS: Readonly<Record<string, string[]>> = {
  names: [
    'andreww',
    'arkregex',
    'braintree',
    'cleye',
    'destr',
    'htmlescape',
    'nanoid',
    'neotraverse',
    'puka',
    'sindresorhus',
    'sonarjs',
    'toposort',
    'tusbar',
    'unutils', // The old package name
    'utilery',
    'verkit',
    'yieldable',
  ],
  misc: ['unstub'],
  englishIshWords: ['arrayify', 'combinators', 'customizer', 'deburr', 'nullary'],
  typeFest: ['jsonify', 'jsonifiable', 'arrayable', 'asyncify', 'optionalize'],
  upstreamNamesWithFlaggedWords: ['ArrayIndices', 'filterArrayIndices', 'indicesOf', 'swapIndices'],
};

export default {
  useGitignore: true,
  enableGlobDot: true,
  ignorePaths: [
    '**/.gitignore',
    '**/.git/**',
    '**/pnpm-lock.yaml',
    'patches/**',
    'test/published-side-effects/__snapshots__/**', // Built code of bundled packages
    '.agents/guidelines.md', // Copied from an external source
    '.all-contributorsrc',
    'CHANGELOG.md', // Generated from changesets
  ],
  dictionaries: ['npm', 'node', 'typescript', 'fullstack'],
  words: Object.values(GLOBALLY_IGNORED_WORDS).flat(),
  flagWords: ['indices->indexes'], // cspell:disable-line
  overrides: [],
} satisfies CSpellSettings;
