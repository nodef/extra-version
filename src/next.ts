import nxt from './_nxt';
import Version from './Version';
import PATCH from './PATCH';
import type {nextFn} from './_types';

/**
 * Gives the next version.
 * 
 * Version step is for updating major, minor, patch, prerelease, or buildmetadata.
 * Next function is for controlling now each part of version is updated with step.
 * If a version part "xv" is to be reset, step part "sv" begins with '.'.
 * @param x a version
 * @param s version step (0.0.1)
 * @param fn next function (xv, sv)
 */
function next(x: Version, s: Version=PATCH, fn: nextFn<string>=null): Version {
  var fn = fn||nxt, r = false;
  var part = (xs: string[], ss: string[]) => {
    for(var i=0, I=xs.length, a=[]; i<I; i++) {
      a[i] = fn(xs[i], (r? '.':'')+(ss[i]||''));
      r = r || a[i]!==xs[i];
    }
    return a;
  };
  var xs = `${x.major}.${x.minor}.${x.patch}`.split('.');
  var ss = `${s.major}.${s.minor}.${s.patch}`.split('.');
  var [major, minor, patch] = part(xs, ss).map(v => parseInt(v, 10));
  var prerelease = s.prerelease? part(x.prerelease||[], s.prerelease) : null;
  var buildmetadata = s.buildmetadata? part(x.buildmetadata||[], s.buildmetadata) : null;
  return new Version(major, minor, patch, prerelease, buildmetadata);
}
export default next;
