import cmp from './_cmp';
import Version from './Version';
import {compare as arrayCompare} from 'extra-array';
import type {compareFn, mapFn} from './_types';

/**
 * Compares two versions. 
 * 
 * Pre-releases are considered lower with respect to normal versions.
 * Build metadata is non-unique and does not alter version ordering.
 * @param x a version
 * @param y another version
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
function compare(x: Version, y: Version, fc: compareFn<string>=null, fm: mapFn<string, string>=null): number {
  // pre-releases are unstable, hence lower
  var xp = x.prerelease||[], XP = xp.length;
  var yp = y.prerelease||[], YP = yp.length;
  if((XP>0)!==(YP>0)) return YP - XP;
  // compare, except build metadata
  var c = x.major - y.major;
  if(c!==0) return c;
  var c = x.minor - y.minor;
  if(c!==0) return c;
  var c = x.patch - y.patch;
  if(c!==0) return c;
  return arrayCompare(xp, yp, fc||cmp, fm);
}
export default compare;
