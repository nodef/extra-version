import compare from './compare';
import Version from './Version';
import type {compareFn, mapFn} from './_types';

/**
 * Checks if two versions are equal.
 * @param x an version
 * @param y another version
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
function isEqual(x: Version, y: Version, fc: compareFn<string>=null, fm: mapFn<string, string>=null): boolean {
  return compare(x, y, fc, fm)===0;
}
export default isEqual;
