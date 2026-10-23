import type {KnipConfig} from 'knip';

export default {
  entry: [
    '.ncurc.js', // cspell:disable-line
    'scripts/publish.ts', // Referenced from the release workflow, not `package.json`
    'src/*/index.ts', // Some symbols are not exported in the main entrypoint, making knip think they are unused (example: server)
    'src/*/*.global.ts', // Side-effect-only entrypoints, intentionally not re-exported from the group barrel
  ],
  ignore: ['test/published-dts/scenarios/**'],
  tags: ['-knipignore'], // cspell:disable-line
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
