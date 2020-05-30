import from from './from';
import split from './_split';
import cmp from './_cmp';
import arrayCompare from '@extra-array/compare';
import type {compareFn, mapFn} from './_types';

/**
 * Compares two versions.
 * @param x a version
 * @param y another version
 * @returns x<y: -1, x=y: 0, x>y: 1
 */
function compare(x: string, y: string, fc: compareFn<string>=null, fm: mapFn<string, string>=null): number {
  var x = from(x), y = from(y);
  var xs = split(x), ys = split(y);
  var XS = xs.length, YS = ys.length;
  if((XS<=3)!==(YS<=3)) return YS-XS;
  else return arrayCompare(xs, ys, fc||cmp, fm);
}
export default compare;
