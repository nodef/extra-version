import from from './from';
import type {IVersion} from './_types';

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
