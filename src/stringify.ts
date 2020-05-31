import Version from './Version';

/**
 * Converts version to string.
 * @param x a version
 */
function stringify(x: Version): string {
  var {major, minor, patch, prerelease, buildmetadata} = x;
  var a = `${major}.${minor}.${patch}`;
  if(prerelease && prerelease.length>0) a += '-'+prerelease.join('.');
  if(buildmetadata && buildmetadata.length>0) a += '+'+buildmetadata.join('.');
  return a;
}
export default stringify;
