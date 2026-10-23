// cspell:ignore npmx

import fs from 'node:fs';
import {regexEscape} from '../src/regex/regex-escape.ts';
import {
  DIST_PNPM,
  NOTICES_PATH,
  collectStorePackageNames,
  findLicenseTextMismatches,
  readInstalledPackageJson,
} from './_third-party-notices.ts';

const TABLE_START = '<!-- THIRD_PARTY_NOTICES_TABLE:START -->';
const TABLE_END = '<!-- THIRD_PARTY_NOTICES_TABLE:END -->';
const GENERATED_NOTE =
  '<!-- The table below is generated automatically upon publishing; do not edit it by hand -->';
const NPMX_BASE = 'https://npmx.dev';

const TABLE_REGION_REGEX = new RegExp(
  String.raw`${regexEscape(TABLE_START)}[\s\S]*?${regexEscape(TABLE_END)}`,
);
// Grouping parentheses SPDX allows around a whole expression, e.g. `(MIT OR CC0-1.0)`
const WRAPPING_PARENS_REGEX = /^\((.*)\)$/;

// eslint-disable-next-line unicorn/no-array-sort
const collectBundledPackageNames = () => [...collectStorePackageNames(DIST_PNPM)].sort();

interface PackageRow {
  packageCell: string;
  versionCell: string;
  licenseCell: string;
}

const TABLE_HEADER: Readonly<PackageRow> = {
  packageCell: 'Package',
  versionCell: 'Version',
  licenseCell: 'License',
};

const buildTable = () => {
  const rows = collectBundledPackageNames().map<PackageRow>((name) => {
    const {version, license} = readInstalledPackageJson(name);
    if (!license) {
      throw new Error(`Package "${name}" is missing a "license" field in its package.json.`);
    }

    return {
      packageCell: `[\`${name}\`](${NPMX_BASE}/${name})`,
      versionCell: `[${version}](${NPMX_BASE}/${name}/v/${version})`,
      licenseCell: license.replace(WRAPPING_PARENS_REGEX, '$1'),
    };
  });

  const allRows = [TABLE_HEADER, ...rows];
  const widthOf = (pick: (row: PackageRow) => string) =>
    Math.max(...allRows.map((row) => pick(row).length));
  const packageWidth = widthOf((row) => row.packageCell);
  const versionWidth = widthOf((row) => row.versionCell);
  const licenseWidth = widthOf((row) => row.licenseCell);

  const formatRow = ({packageCell, versionCell, licenseCell}: PackageRow) =>
    `| ${packageCell.padEnd(packageWidth)} | ${versionCell.padEnd(versionWidth)} | ${licenseCell.padEnd(licenseWidth)} |`;

  return [
    formatRow(TABLE_HEADER),
    `| ${'-'.repeat(packageWidth)} | ${'-'.repeat(versionWidth)} | ${'-'.repeat(licenseWidth)} |`,
    ...rows.map(formatRow),
  ].join('\n');
};

const run = () => {
  if (!fs.existsSync(DIST_PNPM)) {
    throw new Error(`Missing "${DIST_PNPM}". Run \`pnpm build\` before generating the notices.`);
  }

  const noticesText = fs.readFileSync(NOTICES_PATH, 'utf8');
  if (!TABLE_REGION_REGEX.test(noticesText)) {
    throw new Error(
      `Could not find the "${TABLE_START}"..."${TABLE_END}" region in ${NOTICES_PATH}.`,
    );
  }

  const {missing, unused} = findLicenseTextMismatches(noticesText);
  if (missing.length > 0) {
    throw new Error(
      `Add the license texts of these bundled packages to ${NOTICES_PATH}: ${missing.join(', ')}.`,
    );
  }
  if (unused.length > 0) {
    throw new Error(
      `Remove the license texts of these packages that are no longer bundled from ${NOTICES_PATH}: ${unused.join(', ')}.`,
    );
  }

  const region = `${TABLE_START}\n\n${GENERATED_NOTE}\n\n${buildTable()}\n\n${TABLE_END}`;
  fs.writeFileSync(
    NOTICES_PATH,
    noticesText.replace(TABLE_REGION_REGEX, () => region),
  );
};

run();
