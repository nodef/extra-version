import Version from './Version';

/**
 * Checks if value is version.
 * @param v value
 */
function is(v: any): boolean {
  return v instanceof Version;
}
export default is;
