import {parseNpmPackageSpecifier} from 'utilery/misc';

const parsed = parseNpmPackageSpecifier('@scope/package@1.2.3/sub');
const name: string | undefined = parsed?.name;
// @ts-expect-error -- the result is typed, not `any`
const notANumber: number = parsed;
void name;
void notANumber;
