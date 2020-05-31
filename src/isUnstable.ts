import Version from "./Version";

/**
 * Checks if version is major 0, or pre-release.
 * @param x a version
 */
function isUnstable(x: Version): boolean {
  return x.major===0 || (x.prerelease && x.prerelease.length>0);
}
export default isUnstable;
