// cspell:ignore picklist Vali
import fs from 'node:fs';
import path from 'node:path';
import {cli} from 'cleye';
import ts from 'typescript';
import * as v from 'valibot';
import packageJson from '../package.json' with {type: 'json'};
import {arrayUnique} from '../src/array/array-unique.ts';
import {max} from '../src/math/max.ts';
import {pick} from '../src/object/pick.ts';
import {allUnionMembers} from '../src/ts/all-union-members.ts';

const __dirname = path.resolve(import.meta.dirname, '..');

type CountType = 'functions' | 'types' | 'constants' | 'files';
const COUNT_TYPES = allUnionMembers<CountType, {readonly: true}>()([
  'functions',
  'types',
  'constants',
  'files',
]);
const COUNT_TYPE_ALL = 'all';

type OutputFormat = 'text' | 'json';
const OUTPUT_FORMATS = allUnionMembers<OutputFormat, {readonly: true}>()(['text', 'json']);
const DEFAULT_OUTPUT_FORMAT: OutputFormat = 'text';

const quoteList = (values: readonly string[]) => values.map((value) => `'${value}'`).join(', ');

// Separates the columns in the text output
const COLUMN_GAP = '  ';

const DIST_PREFIX = './dist/';
const MJS_EXTENSION_REGEX = /\.mjs$/;

const FLAGS_SCHEMA = v.object({
  type: v.pipe(
    v.array(v.picklist([COUNT_TYPE_ALL, ...COUNT_TYPES])),
    v.check(
      (values) => !(values.includes(COUNT_TYPE_ALL) && values.length > 1),
      `\`${COUNT_TYPE_ALL}\` cannot be combined with other \`type\` values.`,
    ),
    v.transform((values) =>
      values.includes(COUNT_TYPE_ALL)
        ? [...COUNT_TYPES]
        : arrayUnique(values).filter((value) => value !== COUNT_TYPE_ALL),
    ),
  ),
  format: v.picklist(OUTPUT_FORMATS),
});

interface Subpath {
  subpath: string;
  sourceEntry: string;
}

const readSubpaths = (): Subpath[] =>
  Object.entries(packageJson.exports).flatMap(([subpath, target]) => {
    // Entries like `./package.json` point to a non-code file outside `dist/`
    if (!target.startsWith(DIST_PREFIX)) {
      return [];
    }

    const sourceEntry = path.join(
      __dirname,
      target.replace(DIST_PREFIX, 'src/').replace(MJS_EXTENSION_REGEX, '.ts'),
    );
    if (!fs.existsSync(sourceEntry)) {
      throw new Error(`Could not find the source file of "${subpath}": ${sourceEntry}`);
    }

    return {subpath, sourceEntry};
  });

const resolveRelativeModule = (fromFile: string, specifier: string) => {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.ts`, path.join(base, 'index.ts')];

  return candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
  );
};

const collectUtilityFiles = (
  entry: string,
  program: ts.Program,
  visited = new Set<string>(),
  files = new Set<string>(),
) => {
  if (visited.has(entry)) {
    return files;
  }
  visited.add(entry);

  const sourceFile = program.getSourceFile(entry);
  if (sourceFile == null) {
    return files;
  }

  sourceFile.statements.forEach((statement) => {
    if (
      !ts.isExportDeclaration(statement) ||
      statement.moduleSpecifier == null ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.moduleSpecifier.text.startsWith('.')
    ) {
      return;
    }

    const resolved = resolveRelativeModule(entry, statement.moduleSpecifier.text);
    if (resolved != null) {
      if (path.basename(resolved) === 'index.ts') {
        collectUtilityFiles(resolved, program, visited, files);
      } else {
        files.add(resolved);
      }
    }
  });

  return files;
};

const classifyExport = (symbol: ts.Symbol, checker: ts.TypeChecker): CountType => {
  const resolved = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;

  if ((resolved.flags & ts.SymbolFlags.Value) === 0) {
    return 'types';
  }

  const declaration = resolved.valueDeclaration || resolved.declarations?.[0];
  if (declaration == null) {
    return 'constants';
  }

  const type = checker.getTypeOfSymbolAtLocation(resolved, declaration);
  const isCallable =
    type.getCallSignatures().length > 0 || type.getConstructSignatures().length > 0;

  return isCallable ? 'functions' : 'constants';
};

type Counts = Record<CountType, number>;

const countCategories = (categories: Iterable<CountType>, fileCount: number) =>
  [...categories].reduce<Counts>(
    (counts, category) => {
      counts[category] += 1;
      return counts;
    },
    {functions: 0, types: 0, constants: 0, files: fileCount},
  );

const analyze = (subpaths: Subpath[]) => {
  const configPath = ts.findConfigFile(
    __dirname,
    (fileName) => ts.sys.fileExists(fileName),
    'tsconfig.json',
  );
  if (configPath == null) {
    throw new Error('Could not locate tsconfig.json.');
  }

  const configFile = ts.readConfigFile(configPath, (fileName) => ts.sys.readFile(fileName));
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, __dirname);

  const program = ts.createProgram(
    subpaths.map(({sourceEntry}) => sourceEntry),
    parsedConfig.options,
  );
  const checker = program.getTypeChecker();

  const overallCategories = new Map<string, CountType>();
  const overallFiles = new Set<string>();

  const perSubpath = subpaths.map(({subpath, sourceEntry}) => {
    const sourceFile = program.getSourceFile(sourceEntry);
    const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
    const categories = (moduleSymbol == null ? [] : checker.getExportsOfModule(moduleSymbol)).map(
      (exportSymbol) => {
        const category = classifyExport(exportSymbol, checker);
        overallCategories.set(exportSymbol.getName(), category);
        return category;
      },
    );

    // A non-index entry (like a `*.global` module) is a utility file itself
    const files =
      path.basename(sourceEntry) === 'index.ts'
        ? collectUtilityFiles(sourceEntry, program)
        : new Set([sourceEntry]);
    for (const file of files) {
      overallFiles.add(file);
    }

    return {subpath, counts: countCategories(categories, files.size)};
  });

  return {overall: countCategories(overallCategories.values(), overallFiles.size), perSubpath};
};

const formatText = (
  overall: Counts,
  perSubpath: {subpath: string; counts: Counts}[],
  requested: CountType[],
) => {
  const formatCounts = (counts: Counts) =>
    requested.map((category) => `${category}=${counts[category]}`).join(COLUMN_GAP);

  const subpathWidth = max(perSubpath.map(({subpath}) => subpath.length)) || 0;

  const lines = [
    'utilery export counts',
    '',
    `Overall${COLUMN_GAP}${formatCounts(overall)}`,
    '',
    'By subpath',
    ...perSubpath.map(
      ({subpath, counts}) =>
        `${COLUMN_GAP}${subpath.padEnd(subpathWidth)}${COLUMN_GAP}${formatCounts(counts)}`,
    ),
  ];

  return lines.join('\n');
};

const main = () => {
  const argv = cli({
    name: 'count-exports',
    flags: {
      type: {
        type: [String],
        default: [COUNT_TYPE_ALL],
        description: `What to count: '${COUNT_TYPE_ALL}', or any of ${quoteList(COUNT_TYPES)} (repeatable). '${COUNT_TYPE_ALL}' cannot be combined with others.`,
      },
      format: {
        type: String,
        default: DEFAULT_OUTPUT_FORMAT,
        description: `Output format: ${quoteList(OUTPUT_FORMATS)} (default '${DEFAULT_OUTPUT_FORMAT}').`,
      },
    },
  });

  let flags: v.InferOutput<typeof FLAGS_SCHEMA>;
  try {
    flags = v.parse(FLAGS_SCHEMA, argv.flags);
  } catch (error) {
    if (v.isValiError(error)) {
      console.error(`Invalid flags:\n${v.summarize(error.issues)}`);
      process.exit(1);
    }
    throw error;
  }

  const requested = flags.type;
  const {overall, perSubpath} = analyze(readSubpaths());

  if (flags.format === 'json') {
    console.log(
      JSON.stringify(
        {
          overall: pick(overall, requested),
          subpaths: Object.fromEntries(
            perSubpath.map(({subpath, counts}) => [subpath, pick(counts, requested)]),
          ),
        },
        null,
        2,
      ),
    );
  } else {
    console.log(formatText(overall, perSubpath, requested));
  }
};

main();
