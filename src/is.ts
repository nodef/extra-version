import Version from './Version';

/**
 * Checks if value is version.
 * @param v value
 */
function is(v: any): boolean {
  return v instanceof Version;
  // return v && typeof v==='object' &&
  //   typeof v.major==='number' &&
  //   typeof v.minor==='number' &&
  //   typeof v.patch==='number' &&
  //   v.prerelease==null || Array.isArray(v.prerelease) &&
  //   v.buildmetadata==null || Array.isArray(v.buildmetadata);
}
export default is;
