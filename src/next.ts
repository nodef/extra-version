import nxt from './_nxt';
import Version from './Version';
import PATCH from './PATCH';
import type {nextFn} from './_types';

function nextPart(xs: string[], ss: string[], fn: nextFn<string>): string[] {
  var r = false, a = [];
  for(var i=0, I=xs.length; i<I; i++) {
    a[i] = fn(xs[i], (r? '.':'')+(ss[i]||''));
    r = a[i]!==xs[i];
  }
  return a;
}

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
  var fn = fn||nxt;
  var xs = `${x.major}.${x.minor}.${x.patch}`.split('.');
  var ss = `${s.major}.${s.minor}.${s.patch}`.split('.');
  var [major, minor, patch] = nextPart(xs, ss, fn).map(parseInt);
  var prerelease = s.prerelease? nextPart(x.prerelease||[], s.prerelease, fn) : null;
  var buildmetadata = s.buildmetadata? nextPart(x.buildmetadata||[], s.buildmetadata, fn) : null;
  return new Version(major, minor, patch, prerelease, buildmetadata);
}
export default next;
