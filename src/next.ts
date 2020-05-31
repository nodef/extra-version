import nxt from './_nxt';
import Version from './Version';
import NEXT_PATCH from './NEXT_PATCH';
import type {nextFn} from './_types';

function nextPart(vs: string[], ds: string[], fn: nextFn<string>): string[] {
  var r = false, a = [];
  for(var i=0, I=vs.length; i<I; i++) {
    a[i] = fn(vs[i], (r? '.':'')+(ds[i]||''));
    r = a[i]!==vs[i];
  }
  return a;
}

/**
 * Gives the next version.
 * @param x a version
 * @param s version step (0.0.1)
 * @param fn next function (v, d)
 */
function next(x: Version, s: Version=NEXT_PATCH, fn: nextFn<string>=null): Version {
  var fn = fn||nxt;
  var vs = `${x.major}.${x.minor}.${x.patch}`.split('.');
  var ds = `${s.major}.${s.minor}.${s.patch}`.split('.');
  var [major, minor, patch] = nextPart(vs, ds, fn).map(parseInt);
  var prerelease = s.prerelease? nextPart(x.prerelease||[], s.prerelease, fn) : null;
  var buildmetadata = s.buildmetadata? nextPart(x.buildmetadata||[], s.buildmetadata, fn) : null;
  return new Version(major, minor, patch, prerelease, buildmetadata);
}
export default next;
