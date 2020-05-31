import cmp from './_cmp';
import Version from './Version';
import arrayCompare from '@extra-array/compare';
import type {compareFn, mapFn} from './_types';

/**
 * Compares two versions.
 * @param x a version
 * @param y another version
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
function compare(x: Version, y: Version, fc: compareFn<string>=null, fm: mapFn<string, string>=null): number {
  // version with prerelease is unstable, hence its lower
  var XP = x.prerelease.length, YP = y.prerelease.length;
  if((XP>0)!==(YP>0)) return YP - XP;
  // otherwise, compare except buildmetadata
  var c = x.major - y.major;
  if(c!==0) return c;
  var c = x.minor - y.minor;
  if(c!==0) return c;
  var c = x.patch - y.patch;
  if(c!==0) return c;
  var c = arrayCompare(x.prerelease, y.prerelease, fc||cmp, fm);
  return c;
}
export default compare;
