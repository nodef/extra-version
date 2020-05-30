import from from './from';
import nxt from './_nxt';
import type {nextFn} from './_types';

/**
 * Gives the next version.
 * @param x a version
 * @param s version step (0.0.1)
 */
function next(x: string, s: string='0.0.1', fn: nextFn<string>=null): string {
  var fn = fn||nxt, a = ''
  var x = from(x), s = from(s, true);
  var [x, xbld] = x.split('+');
  var [s, sbld] = s.split('+');
  var [x, xpre] = x.split('-');
  var [s, spre] = s.split('-');
  var xs = x.split(/[\.\-\+]/);
  var ss = s.split(/[\.\-\+]/);
  for(var i=0, j=0, I=xs.length, r=false; i<I; i++) {
    var p = fn(xs[i], (r? '/':'')+(ss[i]||''));
    r = r || p!==xs[i];
    j += xs[i].length+1;
    a += p+(x[j-1]||'');
  }
  return a;
}
export default next;
