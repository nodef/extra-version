import Version from './Version';

const RPDEFAULT = /^\s*(\d+\.\d+\.\d+)(?:\-([\w-]+(?:\.[\w-]+)*))?(?:\+([\w-]+(?:\.[\w-]+)*))?/;
const RPVERSION = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+\.\d+\.\d+)(?:\-([\w-]+(?:\.[\w-]+)*))?(\+[\w-]+(?:\.[\w-]+)*)?/;
const RPPARTIAL = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+(?:\.\d+))(?:\-([\w-]+(?:\.[\w-]+)*))?(\+[\w-]+(?:\.[\w-]+)*)?/;
const RPANYWORD = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d[^\s\.\-\+]*(?:\.[^\s\.\-\+]+))(?:\-([^\s\.\-\+]+(?:\.[^\s\.\-\+]+)*))?(\+[^\s\.\-\+]+(?:\.[^\s\.\-\+]+)*)?/;
const RPANYCHAR = /^\D*(\d\S*(?:\.[^\.\-\+]+))(?:\-([^\.\-\+]+(?:\.[^\.\-\+]+)*))?(?:\+([^\.\-\+]+(?:\.[^\.\-\+])*))?/;
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
 * Converts string to version.
 * @param s a string
 * @param i start index (0)
 * @param lvl permissive level, 0-4/-1 (0 => none)
 * @returns [end index, version], or [-1, null]
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
export default parse;
