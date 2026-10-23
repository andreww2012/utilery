import fs from 'node:fs';
import path from 'node:path';
import {eslintConfig} from 'eslint-config-un';
import {GLOB_MARKDOWN_SUPPORTED_CODE_BLOCKS} from 'eslint-config-un/globs';
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
      files: [GLOB_MARKDOWN_SUPPORTED_CODE_BLOCKS],
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
      // `eslint-config-un` comes with Prettier, which would format code blocks too
      configFormatFencedCodeBlocks: false,
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
    unicorn: {
      overrides: {
        'unicorn/consistent-boolean-name': (severity, options) => ({
          severity,
          options: [{...options?.[0], ignore: ['^predicate$']}],
        }),
      },
    },

    // False positives:
    rxjs: false,
    zod: false,
  },
});
