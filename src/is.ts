import RVERSION from './RVERSION';

/**
 * Checks if value is version.
 * @param v value
 */
function is(v: any): boolean {
  if(typeof v!=='string') return false;
  return RVERSION.test(v);
}
export default is;
