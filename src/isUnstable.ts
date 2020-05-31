import Version from "./Version";

/**
 * Checks is version has a prerelease.
 * @param x a version
 */
function isUnstable(x: Version): boolean {
  return x.prerelease.length>0;
}
export default isUnstable;
