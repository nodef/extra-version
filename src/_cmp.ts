/**
 * Compares two version parts.
 * @param a a version part
 * @param b another version part
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
function cmp(a: string, b: string): number {
  if(isNaN(a as any) || isNaN(b as any)) return a.localeCompare(b);
  else return parseInt(a, 10) - parseInt(b, 10);
}
export default cmp;
