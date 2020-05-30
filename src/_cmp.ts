/**
 * Compares two version parts.
 * @param a a version part
 * @param b another version part
 * @returns a<b: -1, a=b: 0, a>b: 1
 */
function cmp(x: string, y: string): number {
  if(isNaN(x as any) || isNaN(y as any)) return x.localeCompare(y);
  else return parseInt(x, 10) - parseInt(y, 10);
}
export default cmp;
