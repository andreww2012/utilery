import fs from 'node:fs';
import {
  DIST_PNPM,
  NOTICES_PATH,
  findLicenseTextMismatches,
} from '../../scripts/_third-party-notices.ts';

// Every package whose code or types end up in the published `dist/` needs its license text in the
// notices, and only these packages. Assumes `dist/` is already built (does NOT build); run after
// `nr build`

it('has license texts of exactly the bundled packages', () => {
  if (!fs.existsSync(DIST_PNPM)) {
    throw new Error('Built `dist/` not found. Run `nr build` before this check.');
  }

  expect(findLicenseTextMismatches(fs.readFileSync(NOTICES_PATH, 'utf8'))).toStrictEqual({
    missing: [],
    unused: [],
  });
});
