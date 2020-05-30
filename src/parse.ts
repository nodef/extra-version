import from from './from';
import type {IVersion} from './_types';

/**
 * Gives parts of version.
 * @param x a version
 */
function parse(x: string): IVersion {
  var x = from(x);
  var [x, buildmetadata] = x.split('+');
  var [x, prerelease] = x.split('-');
  var [major, minor, patch] = x.split('.').map(parseInt);
  return {major, minor, patch, prerelease, buildmetadata};
}
export default parse;
