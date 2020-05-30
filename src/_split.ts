/**
 * Splits a version into parts, including prerelease.
 * @param x a version
 */
function split(x: string): string[] {
  return x.replace(/\+.*/, '').split(/[\.\-]/);
}
export default split;
