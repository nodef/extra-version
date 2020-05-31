import Version from "./Version";

/**
 * Checks if version is a pre-release.
 * @param x a version
 */
function isUnstable(x: Version): boolean {
  return x.major===0 || (x.prerelease && x.prerelease.length>0);
}
export default isUnstable;
