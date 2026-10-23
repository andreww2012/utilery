import fs from 'node:fs';
import path from 'node:path';
import {rolldown} from 'rolldown';
import {arrayChunks} from '../../src/array/array-chunks.ts';

// Imports every built module without using its exports and snapshots the code a bundler still
// keeps when it ignores the `sideEffects` field of `package.json`. That code runs on import, so
// when the snapshot changes, check that the new code doesn't do anything that matters even when
// the module's exports are unused, then update the snapshot with `nr test:side-effects -u`.
// Assumes `dist/` is already built (does NOT build); run after `nr build`

const DIST_PATH = path.resolve(import.meta.dirname, '../../dist');
const ENTRY_ID = 'entry';
const MODULE_MARKER_REGEX = /^__module__\("(.+)"\);$/m;
const PNPM_STORE_PATH_REGEX = /node_modules\/\.pnpm\/[^/]+\/node_modules\//g;

it('keeps only the known code of unused modules', async () => {
  const files = fs.globSync('**/*.mjs', {cwd: DIST_PATH});
  if (files.length === 0) {
    throw new Error('Built `dist/` not found. Run `nr build` before the side effects check.');
  }

  const bundle = await rolldown({
    input: ENTRY_ID,
    logLevel: 'silent',
    experimental: {
      attachDebugInfo: 'none', // Do not attach Rolldown's module comments
    },
    // Unlike `true`, rules also override the `sideEffects` field of `package.json`
    treeshake: {moduleSideEffects: [{test: /./, sideEffects: true}]},
    plugins: [
      {
        name: 'import-unused',
        resolveId: (id) => (id === ENTRY_ID ? id : null),
        load: (id) =>
          id === ENTRY_ID
            ? files
                .map((file) => `import ${JSON.stringify(path.join(DIST_PATH, file))};`)
                .join('\n')
            : null,
        // Marks where each module's code starts
        transform: {
          filter: {id: /\.mjs$/},
          handler: (code, id) => {
            const modulePath = path
              .relative(DIST_PATH, id)
              .replaceAll(path.sep, '/')
              .replaceAll(PNPM_STORE_PATH_REGEX, 'node_modules/');
            return `__module__(${JSON.stringify(modulePath)});\n${code}`;
          },
        },
      },
    ],
  });
  const {
    output: [chunk],
  } = await bundle.generate({comments: false});

  const [externalImports = '', ...markedSections] = chunk.code.split(MODULE_MARKER_REGEX);
  const retainedCode = [
    externalImports.trim(),
    ...arrayChunks(markedSections, 2).map(
      ([modulePath, code = '']) => code.trim() && `// ${modulePath}\n${code.trim()}`,
    ),
  ]
    .filter(Boolean)
    .join('\n\n');

  await expect(`${retainedCode}\n`).toMatchFileSnapshot('./__snapshots__/retained-code.txt');
});
