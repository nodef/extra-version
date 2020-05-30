/**
 * Check is version has a prerelease.
 * @param x a version
 */
function isUnstable(x: string): boolean {
  return x.includes('-');
}
export default isUnstable;
