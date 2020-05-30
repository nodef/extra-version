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
 * @see https://semver.org
 */
interface IVersion {
  /**
   * Major version X (X.y.z | X > 0) MUST be incremented if any backwards
   * incompatible changes are introduced to the public API. It MAY also
   * include minor and patch level changes. Patch and minor version MUST
   * be reset to 0 when major version is incremented.
   * 
   * Major version zero (0.y.z) is for initial development. Anything MAY
   * change at any time. The public API SHOULD NOT be considered stable.
   * Version 1.0.0 defines the public API. The way in which the version
   * number is incremented after this release is dependent on this public
   * API and how it changes.
   * @see https://semver.org
   */
  major?: number,

  /**
   * Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backwards
   * compatible functionality is introduced to the public API. It MUST
   * be incremented if any public API functionality is marked as deprecated.
   * It MAY be incremented if substantial new functionality or improvements
   * are introduced within the private code. It MAY include patch level
   * changes. Patch version MUST be reset to 0 when minor version is
   * incremented.
   * @see https://semver.org
   */
  minor?: number,

  /**
   * Patch version Z (x.y.Z | x > 0) MUST be incremented if only backwards
   * compatible bug fixes are introduced. A bug fix is defined as an internal
   * change that fixes incorrect behavior.
   * @see https://semver.org
   */
  patch?: number,

  /**
   * A pre-release version MAY be denoted by appending a hyphen and a series
   * of dot separated identifiers immediately following the patch version.
   * Identifiers MUST comprise only ASCII alphanumerics and hyphen
   * [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers MUST NOT
   * include leading zeroes. Pre-release versions have a lower precedence
   * than the associated normal version. A pre-release version indicates that
   * the version is unstable and might not satisfy the intended compatibility
   * requirements as denoted by its associated normal version.
   * @example 1.0.0-alpha, 1.0.0-alpha.1, 1.0.0-0.3.7, 1.0.0-x.7.z.92.
   * @see https://semver.org
   */
  prerelease?: string,

  /**
   * Build metadata MAY be denoted by appending a plus sign and a series of
   * dot separated identifiers immediately following the patch or pre-release
   * version. Identifiers MUST comprise only ASCII alphanumerics and hyphen
   * [0-9A-Za-z-]. Identifiers MUST NOT be empty. Build metadata MUST be
   * ignored when determining version precedence. Thus two versions that
   * differ only in the build metadata, have the same precedence.
   * @example 1.0.0-alpha+001, 1.0.0+20130313144700, 1.0.0-beta+exp.sha.5114f85.
   * @see https://semver.org
   */
  buildmetadata?: string
};
