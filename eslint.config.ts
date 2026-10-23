import fs from 'node:fs';
import path from 'node:path';
import {eslintConfig} from 'eslint-config-un';
import oxfmtConfig from './oxfmt.config.ts';

const PACKAGE_DOC_EXTENSION_REGEX = /\.md$/;

// Every bundled package has its own doc, like `@antfu__utils.md` for `@antfu/utils`.
// DefinitelyTyped uses the same naming, like `@types/antfu__utils`
const bundledPackages = fs
  .readdirSync(path.join(import.meta.dirname, 'docs/packages'))
  .flatMap((fileName) => {
    const typesName = fileName.replace(PACKAGE_DOC_EXTENSION_REGEX, '');
    return [typesName.replace('__', '/'), `@types/${typesName}`];
  });

export default eslintConfig({
  ignores: [
    '.agents/guidelines.md', // Copied from an external source
    'CHANGELOG.md', // Auto-generated
    'LICENSE.md',
    'test/published-dts/scenarios/**',
  ],
  mode: 'lib',
  defaultConfigsStatus: 'misc-enabled',
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
  ],
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
    e18e: {
      configModuleReplacements: {
        options: {
          allowed: [
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
      overrides: {
        'vitest/require-hook': (severity, options) => ({
          severity,
          // Declares tests, like `describe`
          options: [{...options?.[0], allowedFunctionCalls: ['describeWithAndWithoutNative']}],
        }),
      },
    },

    // False positives:
    rxjs: false,
    zod: false,
  },
});
