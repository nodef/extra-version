import Version from './Version';

const RPDEFAULT = /^\s*(\d+\.\d+\.\d+)(\-[\w-]+(?:\.[\w-]+)*)?(\+[\w-]+(?:\.[\w-]+)*)?/;
const RPVERSION = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+\.\d+\.\d+)(\-[\w-]+(?:\.[\w-]+)*)?(\+[\w-]+(?:\.[\w-]+)*)?/;
const RPPARTIAL = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+(?:\.\d+))(\-[\w-]+(?:\.[\w-]+)*)?(\+[\w-]+(?:\.[\w-]+)*)?/;
const RPANYWORD = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d\S*(?:\.\S+))(\-\S+(?:\.\S+)*)?(\+\S+(?:\.\S+)*)?/;
const RPANYCHAR = /^\D*(\d\S*(?:\.[^\.]+))(\-[^\.]+(?:\.[^\.]+)*)?(\+[^\.]+(?:\.[^\.])*)?/;
const RPLEVELS = [RPDEFAULT, RPVERSION, RPPARTIAL, RPANYWORD, RPANYCHAR];
const RDASH = /[_-]+/g;
const RCHAR = /[^0-9A-Za-z-\.]/g;
const RZERO = /(^|-\.)0+([1-9]+)/g;

function parseRegexp(l: number): RegExp {
  var L = RPLEVELS.length;
  var l = l>=0 && l<L? l:L-1;
  return RPLEVELS[l];
}

function parseSplit(s: string): string[] {
  return s? s.replace(RDASH, '-').replace(RCHAR, '').replace(RZERO, '$1$2').split('.'):[];
}

/**
 * Converts string to version, if possible.
 * @param s a string
 * @param i start index (0)
 * @param lvl permissive level (0 => none)
 * @returns found: [end index, version], else: [-1, null]
 */
function parse(s: string, i: number=0, lvl: number=0): [number, Version] {
  var m = parseRegexp(lvl).exec(s.slice(i));
  if(m==null) return [-1, null];
  var [vs, prerelease, buildmetadata] = m.slice(1, 4).map(parseSplit);
  var [major, minor, patch] = [...vs, '', ''].slice(0, 3).map(v => parseInt(v, 10)||0);
  buildmetadata.unshift(...vs.slice(3));
  var a = new Version(major, minor, patch, prerelease, buildmetadata);
  return [i+m[0].length, a];
}


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




const REMPTY = /(^|\.)(\.|$)/g;
const REXTRA = /(^|-\.)0+([1-9]+)/g;
const RPREFIX = /.*?(\d)/;
const RNOTPART = /[^\.0-9A-Za-z-]/g;

/**
 * Gives parts of version.
 * @param x a version
 */
function parseOld(x: string): IVersion {
  var x = from(x);
  var i = x.indexOf('+'), buildmetadata = i<0? null : x.slice(i+1);
  var j = x.indexOf('-'), prerelease = j<0? null : x.slice(j+1, i<0? x.length:i);
  var [major, minor, patch] = x.slice(0).split('.').map(parseInt);
  return {major, minor, patch, prerelease, buildmetadata};
}
export default parse;

