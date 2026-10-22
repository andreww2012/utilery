import type {CSpellSettings} from 'cspell';

const GLOBALLY_IGNORED_WORDS: Readonly<Record<string, string[]>> = {
  names: [
    'andreww',
    'unutils',
    'verkit',
    'sonarjs',
    'destr',
    'yieldable',
    'ark',
    'arkregex',
    'arktype',
    'cleye',
    'nanoid',
    'neotraverse',
    'tusbar',
  ],
  misc: ['knipignore', 'rearg', 'GHSA', 'unstub'],
  englishIshWords: [
    'arrayify',
    'combinators',
    'customizer',
    'deburr',
    'iteratees',
    'nullary',
    'stringifiers',
  ],
  typeFest: ['jsonify', 'jsonifiable', 'arrayable', 'asyncify', 'optionalize'],
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
  ],
  dictionaries: ['npm', 'node', 'typescript', 'fullstack'],
  words: Object.values(GLOBALLY_IGNORED_WORDS).flat(),
  overrides: [],
} satisfies CSpellSettings;
