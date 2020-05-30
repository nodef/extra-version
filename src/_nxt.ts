/**
 * Gives next version part.
 * @param v a version part
 * @param s version step part
 */
function nxt(v: string, s: string): string {
  var r = s.startsWith('/'), s = s.slice(r? 1:0);
  if(isNaN(v as any)) return s||v;
  return ((r? 0:parseInt(v))+(parseInt(s)||0)).toString();
}
export default nxt;
