/**
 * Gives next version part.
 * @param v a version part
 * @param d version step part
 */
function nxt(v: string, d: string): string {
  var r = d.startsWith('.'), d = d.slice(r? 1:0);
  if(isNaN(v as any)) return d||v;
  return ((r? 0:parseInt(v))+(parseInt(d)||0)).toString();
}
export default nxt;
