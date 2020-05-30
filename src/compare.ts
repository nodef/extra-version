import type {IVersion} from './_types';

/**
 * Compares two versions.
 * @param x a version
 * @param y another version
 * @returns x<y: -1, x=y: 0, x>y: 1
 */
function compare(x: IVersion, y: IVersion): number {
  var c = x.major - y.major;
  if(c) return c;
  var c = x.minor - y.minor;
  if(c) return c;
  var c = x.patch - y.patch;
  if(c) return c;
  var c = x.prerelease.localeCompare(y.prerelease);
  return c;
}
export default compare;
