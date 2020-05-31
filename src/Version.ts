import stringify from './stringify';

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
class Version {
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
  constructor(major: number=0, minor: number=0, patch: number=0, prerelease: string[]=null, buildmetadata: string[]=null) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.prerelease = prerelease;
    this.buildmetadata = buildmetadata;
  }

  /**
   * Converts version to string.
   */
  toString() { return stringify(this); }
}
export default Version;
