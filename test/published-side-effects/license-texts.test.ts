import fs from 'node:fs';
import {
  DIST_PNPM,
  NOTICES_PATH,
  findPackagesWithoutLicenseText,
} from '../../scripts/_third-party-notices.ts';

// Every package whose code or types end up in the published `dist/` needs its license text in the
// notices. Assumes `dist/` is already built (does NOT build); run after `nr build`

it('has a license text for every bundled package', () => {
  if (!fs.existsSync(DIST_PNPM)) {
    throw new Error('Built `dist/` not found. Run `nr build` before this check.');
  }

  expect(findPackagesWithoutLicenseText(fs.readFileSync(NOTICES_PATH, 'utf8'))).toStrictEqual([]);
});
