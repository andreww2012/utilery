import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import {eslintConfig} from 'eslint-config-un';
import {Alphabet} from 'eslint-plugin-perfectionist/alphabet';
import oxfmtConfig from './oxfmt.config.ts';
import packageJson from './package.json' with {type: 'json'};

const bundledPackages = Object.keys(packageJson.inlinedDependencies).flatMap((name) => [
  name,
  `@types/${name.replace('@', '').replace('/', '__')}`,
]);

const explicitModuleBoundaryTypes = tsEslintPlugin.rules['explicit-module-boundary-types'];

export default eslintConfig({
  ignores: [
    '.agents/guidelines.md', // Copied from an external source
    'CHANGELOG.md', // Auto-generated
    'LICENSE.md',
    'test/published-dts/scenarios/**',
  ],
  mode: 'lib',
  defaultConfigsStatus: 'misc-enabled',
  plugins: {
    perfectionist: {
      settings: {
        // Puts `.` before `-`, so that `./foo.ts` comes before `./foo-bar.ts`
        type: 'custom',
        alphabet: Alphabet.generateRecommendedAlphabet()
          .sortByLocaleCompare('en-US')
          .placeCharacterBefore({characterBefore: '.', characterAfter: '-'})
          .getCharacters(),
      },
    },
  },
  extraPlugins: {
    local: {
      rules: {
        // Doesn't require a return type on an arrow function whose body is `value as T`: the cast
        // already gives it
        'explicit-module-boundary-types': {
          ...explicitModuleBoundaryTypes,
          create: (context: Parameters<typeof explicitModuleBoundaryTypes.create>[0]) =>
            explicitModuleBoundaryTypes.create(
              // Not a spread: the context is frozen and keeps most of its properties in the
              // prototype
              Object.create(context, {
                report: {
                  value: (descriptor: Parameters<typeof context.report>[0]) => {
                    /* eslint-disable ts/no-unsafe-enum-comparison -- The values of the node type
                    enum are these strings, and the package with the enum isn't our dependency */
                    const isCastArrowFunction =
                      'node' in descriptor &&
                      descriptor.node.type === 'ArrowFunctionExpression' &&
                      descriptor.node.body.type === 'TSAsExpression';
                    /* eslint-enable ts/no-unsafe-enum-comparison */
                    if (!isCastArrowFunction) {
                      context.report(descriptor);
                    }
                  },
                },
              }) as typeof context,
            ),
        },
      },
    },
  },
  configs: {
    format: {
      // Other files are formatted by oxfmt itself
      files: [],
      configFencedCodeBlocks: true,
      formatter: [
        'oxfmt',
        {
          bracketSpacing: oxfmtConfig.bracketSpacing,
          printWidth: oxfmtConfig.printWidth,
          singleQuote: oxfmtConfig.singleQuote,
        },
      ],
    },
    import: {
      extraneousDependenciesCheck: (defaultIgnorePatterns) => ({
        checkDevDependencies: {
          ignorePatterns: [...defaultIgnorePatterns, 'test/setup.ts'],
        },
        // Bundled, so they don't have to be in `dependencies`
        whitelist: bundledPackages,
      }),
      requireModuleExtensions: true,
    },
    markdown: {
      configSentencesPerLine: true,
    },
    nodeDependencies: {
      overrides: {
        // The deep check walks the whole dependency tree when no dependency declares one of our
        // engines (almost none declare `engines.bun`), which takes more than 20 minutes
        'node-dependencies/compat-engines': (severity, options) => ({
          severity,
          options: [{...options?.[0], deep: false}],
        }),
      },
    },
    e18e: {
      configModuleReplacements: {
        options: {
          allowed: [
            // Unlike its suggested replacement, tells a missing command (`ENOENT`) from a failed
            // one on Windows, where both make `cmd.exe` exit with `1`
            'cross-spawn',
            // Unlike their suggested replacements: `fast-string-width` (which `fast-wrap-ansi`
            // uses) miscounts zero-width characters, conjoining Hangul and tabs, and the native
            // `util.stripVTControlCharacters` is missing outside Node.js
            'string-width',
            'strip-ansi',
            'wrap-ansi',
          ],
        },
      },
    },
    perfectionist: {
      configSortExports: {
        files: ['src/**/index.ts'],
      },
      configSortNamedExports: {
        files: ['src/**/index.ts'],
      },
    },
    sonar: {
      overrides: {
        // Not redundant with the `exactOptionalPropertyTypes` compiler option, which some users
        // have: then only `?: T | undefined` lets them set the property to `undefined`
        'sonar/no-redundant-optional': 0,
      },
    },
    ts: {
      allowDefaultProject: ['*.config.*ts'],
    },
    un: {
      overrides: {
        'un/prefer-array-for-each': 2,
      },
    },
    unicorn: {
      overrides: {
        'unicorn/consistent-boolean-name': (severity, options) => ({
          severity,
          options: [{...options?.[0], ignore: ['^(filter|predicate)$']}],
        }),
      },
    },
    vitest: {
      additionalAssertions: ['expectOwnProtoKey'],
      overrides: {
        'vitest/require-hook': (severity, options) => ({
          severity,
          // Declares tests, like `describe`
          options: [{...options?.[0], allowedFunctionCalls: ['describeWithAndWithoutNative']}],
        }),
      },
    },

    // False positives:
    zod: false,
  },
  extraConfigs: [
    {
      // The package docs intentionally use a `Package:` prefix in their title
      files: ['docs/packages/*.md'],
      rules: {
        'markdown-preferences/no-heading-trailing-punctuation': 'off',
      },
    },
    {
      files: ['src/**/*.global.ts'],
      rules: {
        'ts/method-signature-style': [2, 'method'],
      },
    },
    {
      files: ['src/**/*.ts'],
      ignores: ['src/_internal/**', 'src/**/_*.ts'],
      rules: {
        'local/explicit-module-boundary-types': 2,
      },
    },
  ],
});
