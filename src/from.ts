const REMPTY = /(^|\.)(\.|$)/g;
const REXTRA = /(^|-\.)0+([1-9]+)/g;
const RPREFIX = /.*?(\d)/;
const RNOTPART = /[^\.0-9A-Za-z-]/g;

/**
 * Converts version-like to version.
 * @param x a version-like
 * @param inc include empty prerelease, build (false)
 */
function from(x: string, inc: boolean=false): string {
  var x = x.replace(REMPTY, '$10$2').replace(REMPTY, '$10$2');
  var x = x.replace(REXTRA, '$1$2').replace(RPREFIX, '$1');
  var i = x.indexOf('+'), bld = i<0? null : x.slice(i+1);
  var j = x.indexOf('-'), pre = j<0? null : x.slice(j+1, i<0? x.length:i);
  var bld = bld? bld.replace(RNOTPART, ''):bld;
  var pre = pre? pre.replace(RNOTPART, ''):pre;
  var xs = x.slice(0, j<0? x.length:j).split('.');
  for(var i=0, I=Math.max(xs.length, 3); i<I; i++)
    xs[i] = isNaN(xs[i] as any)? '0':xs[i];
  var a = xs.slice(0, 3).join('.');
  if(pre || inc && pre!=null) a += '-'+pre;
  if(bld || inc && bld!=null) xs.push(bld);
  if(xs.length>3) a += '+'+xs.slice(3).join('.');
  return a;
}
export default from;
