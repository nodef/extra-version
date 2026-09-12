//#region TYPES
/**
 * Handle comparison of two values.
 * @param a a value
 * @param b another value
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
export type CompareFunction<T> = (a: T, b: T) => number;


/**
 * Handle transformation of a value to another.
 * @param v value in array
 * @param i index of value in array
 * @param x array containing the value
 * @returns transformed value
 */
export type MapFunction<T, U> = (v: T, i: number, x: Iterable<T>) => U;


/**
 * Handle transformation of a version to another version.
 * @param v version part
 * @param d step part
 * @returns next version part
 */
export type NextFunction<T> = (v: T, d: T) => T;
//#endregion




//#region UTILITIES
/**
 * Compare two arrays (lexicographically).
 * @param x an array
 * @param y another array
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
export function arrayCompare<T, U=T>(x: T[], y: T[], fc: CompareFunction<T|U> | null=null, fm: MapFunction<T, T|U> | null=null): number {
  fc = fc || ((a, b) => a<b? -1 : (a>b? 1 : 0));
  fm = fm || ((v, _i, _x) => v);
  const X = x.length;
  const Y = y.length;
  const I = Math.min(X, Y);
  for (let i=0; i<I; ++i) {
    const wx = fm(x[i], i, x);
    const wy = fm(y[i], i, y);
    const c  = fc(wx, wy);
    if (c!==0) return c;
  }
  return Math.sign(X-Y);
}


/**
 * Compare two version parts.
 * @param a a version part
 * @param b another version part
 * @returns a<b: -ve, a=b: 0, a>b: +ve
 */
function compareParts(a: string, b: string): number {
  if (isNaN(Number(a)) || isNaN(Number(b))) return a.localeCompare(b);
  else return parseInt(a, 10) - parseInt(b, 10);
}


/**
 * Give next version part.
 * @param v a version part
 * @param d step part
 */
function nextPart(v: string, d: string): string {
  const r = d.startsWith('.'); d = d.slice(r? 1:0);
  if (isNaN(Number(v)) || isNaN(Number(d))) return d||v;
  return ((r? 0:parseInt(v, 10)||0)+(parseInt(d, 10)||0)).toString();
}
//#endregion




//#region VERSION CLASS
/**
 * Given a version number MAJOR.MINOR.PATCH, increment the:
 *
 * 1. MAJOR version when you make incompatible API changes,
 * 2. MINOR version when you add functionality in a backwards compatible manner
 * 3. PATCH version when you make backwards compatible bug fixes.
 *
 * Additional labels for pre-release and build metadata are available as
 * extensions to the MAJOR.MINOR.PATCH format.
 *
 * A normal version number MUST take the form X.Y.Z where X, Y, and Z are
 * non-negative integers, and MUST NOT contain leading zeroes. X is the
 * major version, Y is the minor version, and Z is the patch version. Each
 * element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0.
 *
 * Software using Semantic Versioning MUST declare a public API. This API
 * could be declared in the code itself or exist strictly in documentation.
 * However it is done, it SHOULD be precise and comprehensive.
 *
 * Once a versioned package has been released, the contents of that version
 * MUST NOT be modified. Any modifications MUST be released as a new version.
 *
 * Major version zero (0.y.z) is for initial development. Anything MAY change
 * at any time. The public API SHOULD NOT be considered stable.
 *
 * Version 1.0.0 defines the public API. The way in which the version number
 * is incremented after this release is dependent on this public API and how
 * it changes.
 * @see https://semver.org
 */
export class Version {
  /**
   * Major is updated on incompatible changes.
   * @example '1'.0.0, '1'.2.3-alpha.1
   */
  major: number;

  /**
   * Minor is updated on adding compatible functionality.
   * Minor is reset to 0 when major is updated.
   * @example 1.'0'.0, 1.'2'.3-alpha.1
   */
  minor: number;

  /**
   * Patch is updated on making compatible bug fixes.
   * Patch is reset to 0 when major or minor is updated.
   * @example 1.0.'0', 1.2.'3'-alpha.1
   */
  patch: number;

  /**
   * Pre-release indicates an unstable version, possibly incompatible.
   * Pre-releases are considered lower with respect to normal versions.
   * It consists of alphanumeric or hyphen, separated by dot.
   * @example 1.0.0-'alpha', 1.2.3-'alpha.1'
   */
  prerelease: string[];

  /**
   * Build metadata provides additonal build information.
   * Build metadata is non-unique and does not alter version ordering.
   * It consists of alphanumeric or hyphen, separated by dot.
   * @example 1.0.0-alpha+'20130313', 1.2.3-beta+'sha.5114f85'.
   */
  buildmetadata: string[];

  /**
   * Defines a semantic version.
   * @param major major number (0)
   * @param minor minor number (0)
   * @param patch patch number (0)
   * @param prerelease pre-release (null)
   * @param buildmetadata build metadata (null)
   */
  constructor(major: number=0, minor: number=0, patch: number=0, prerelease: string[] | null=null, buildmetadata: string[] | null=null) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.prerelease = prerelease || [];
    this.buildmetadata = buildmetadata || [];
  }

  /**
   * Converts version to string.
   */
  toString(): string {
    return stringify(this);
  }
}
//#endregion




//#region CONSTANTS
/**
 * Defines first major version. (1.0.0)
 * Can be used as next major step.
 */
export const MAJOR: Version = new Version(1);


/**
 * Defines first minor version. (0.1.0)
 * Can be used as next minor step.
 */
export const MINOR: Version = new Version(0, 1);


/**
 * Defines first patch version. (0.0.1)
 * Can be used as next patch step.
 */
export const PATCH: Version = new Version(0, 0, 1);


/**
 * Regular expression to check a semver string.
 * @see https://regex101.com/r/vkijKf/1/
 */
export const RVERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
//#endregion




//#region FUNCTIONS
/**
 * Check if value is version.
 * @param v value
 */
export function is(v: unknown): boolean {
  return v instanceof Version;
  // return v && typeof v==='object' &&
  //   typeof v.major==='number' &&
  //   typeof v.minor==='number' &&
  //   typeof v.patch==='number' &&
  //   v.prerelease==null || Array.isArray(v.prerelease) &&
  //   v.buildmetadata==null || Array.isArray(v.buildmetadata);
}


/**
 * Check if version is major 0, or pre-release.
 * @param x a version
 */
export function isUnstable(x: Version): boolean {
  return x.major===0 || (x.prerelease && x.prerelease.length>0);
}


/**
 * Convert value to version.
 * @param v a value
 * @returns version, or null
 */
export function from(v: unknown): Version | null {
  if (typeof v==='number') v = v.toString();
  if (typeof v==='string') return parse(v, 0, -1)[1];
  if (v && typeof v==='object') {
    const u = v as Partial<Version>;
    return new Version(
      u.major||0, u.minor||0, u.patch||0,
      u.prerelease||[], u.buildmetadata||[]
    );
  }
  return null;
}




//#region PARSE
const RPDEFAULT = /^\s*(\d+\.\d+\.\d+)(?:\-([\w-]+(?:\.[\w-]+)*))?(?:\+([\w-]+(?:\.[\w-]+)*))?/;
const RPVERSION = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+\.\d+\.\d+)(?:\-([\w-]+(?:\.[\w-]+)*))?(?:\+([\w-]+(?:\.[\w-]+)*))?/;
const RPPARTIAL = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d+(?:\.\d+)*)(?:\-([\w-]+(?:\.[\w-]+)*))?(?:\+([\w-]+(?:\.[\w-]+)*))?/;
const RPANYWORD = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d[^\s.+-]*(?:\.[^\s.+-]+)*)(?:\-([^\s.+]+(?:\.[^\s.+]+)*))?(?:\+([^\s.]+(?:\.[^\s.]+)*))?/;
const RPANYCHAR = /^\s*(?:(?:v(?:er(?:sion)?)?)?\s*)?(\d[^.+-]*(?:\.[^.+-]+)*)(?:\-([^.+]+(?:\.[^.+]+)*))?(?:\+([^.]+(?:\.[^.]+)*))?/;
const RPLEVELS = [RPDEFAULT, RPVERSION, RPPARTIAL, RPANYWORD, RPANYCHAR];
const RDASH = /[_-]+/g;
const RCHAR = /[^0-9A-Za-z-\.]/g;
const RZERO = /(^|-\.)0+([1-9]+)/g;

function parseRegexp(l: number): RegExp {
  const L = RPLEVELS.length;
  l = l>=0 && l<L? l : L-1;
  return RPLEVELS[l];
}

function parseSplit(s: string): string[] {
  return s? s.replace(RDASH, '-').replace(RCHAR, '').replace(RZERO, '$1$2').split('.'):[];
}

/**
 * Convert string to version.
 * @param s a string
 * @param i start index (0)
 * @param lvl permissive level, 0-4/-1 (0 => none)
 * @returns [end index, version], or [-1, null]
 */
export function parse(s: string, i: number=0, lvl: number=0): [number, Version | null] {
  const m = parseRegexp(lvl).exec(s.slice(i));
  if (m==null) return [-1, null];
  const [vs, prerelease, buildmetadata] = m.slice(1, 4).map(parseSplit);
  const [major, minor, patch] = [...vs, '', ''].slice(0, 3).map(v => parseInt(v, 10) || 0);
  buildmetadata.unshift(...vs.slice(3));
  const a = new Version(major, minor, patch, prerelease, buildmetadata);
  return [i + m[0].length, a];
}

//#endregion




/**
 * Convert version to string.
 * @param x a version
 */
export function stringify(x: unknown): string {
  const {major, minor, patch, prerelease, buildmetadata} = x as Partial<Version>;
  let a = `${major}.${minor}.${patch}`;
  if (prerelease && prerelease.length>0) a += '-'+prerelease.join('.');
  if (buildmetadata && buildmetadata.length>0) a += '+'+buildmetadata.join('.');
  return a;
}


/**
 * Compare two versions.
 *
 * Pre-releases are considered lower with respect to normal versions.
 * Build metadata is non-unique and does not alter version ordering.
 * @param x a version
 * @param y another version
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 * @returns x<y: -ve, x=y: 0, x>y: +ve
 */
export function compare(x: Version, y: Version, fc: CompareFunction<string> | null=null, fm: MapFunction<string, string> | null=null): number {
  // Pre-releases are unstable, hence lower.
  const xp = x.prerelease||[], XP = xp.length;
  const yp = y.prerelease||[], YP = yp.length;
  if ((XP>0) !== (YP>0)) return YP - XP;
  // Compare, except build metadata.
  let c = x.major - y.major;
  if (c!==0) return c;
  c = x.minor - y.minor;
  if (c!==0) return c;
  c = x.patch - y.patch;
  if (c!==0) return c;
  return arrayCompare(xp, yp, fc||compareParts, fm);
}


/**
 * Check if two versions are equal.
 *
 * Pre-releases are considered lower with respect to normal versions.
 * Build metadata is non-unique and does not alter version ordering.
 * @param x an version
 * @param y another version
 * @param fc compare function (a, b)
 * @param fm map function (v, i, x)
 */
export function isEqual(x: Version, y: Version, fc: CompareFunction<string> | null=null, fm: MapFunction<string, string> | null=null): boolean {
  return compare(x, y, fc, fm) === 0;
}


/**
 * Give the next version.
 *
 * Version step is for updating major, minor, patch, prerelease, or buildmetadata.
 * Next function is for controlling now each part of version is updated with step.
 * If a version part "xv" is to be reset, step part "sv" begins with '.'.
 * @param x a version
 * @param s version step (0.0.1)
 * @param fn next function (xv, sv)
 */
export function next(x: Version, s: Version=PATCH, fn: NextFunction<string> | null=null): Version {
  fn = fn || nextPart;
  let r = false;
  const part = (xs: string[], ss: string[]) => {
    const I = xs.length, a = [];
    for (let i=0; i<I; i++) {
      a[i] = fn(xs[i], (r? '.':'') + (ss[i]||''));
      r = r || a[i]!==xs[i];
    }
    return a;
  };
  const xs = `${x.major}.${x.minor}.${x.patch}`.split('.');
  const ss = `${s.major}.${s.minor}.${s.patch}`.split('.');
  const [major, minor, patch] = part(xs, ss).map(v => parseInt(v, 10));
  const prerelease = s.prerelease? part(x.prerelease||[], s.prerelease) : null;
  const buildmetadata = s.buildmetadata? part(x.buildmetadata||[], s.buildmetadata) : null;
  return new Version(major, minor, patch, prerelease, buildmetadata);
}
//#endregion
