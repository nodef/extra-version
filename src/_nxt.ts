/**
 * Gives next version part.
 * @param v a version part
 * @param d step part
 */
function nxt(v: string, d: string): string {
  var r = d.startsWith('.'), d = d.slice(r? 1:0);
  if(isNaN(v as any)) return d||v;
  return ((r? 0:parseInt(v, 10))+(parseInt(d, 10)||0)).toString();
}
export default nxt;
