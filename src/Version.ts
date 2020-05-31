class Version {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
  buildmetadata: string[];
  
  constructor(major: number=0, minor: number=0, patch: number=0, prerelease: string[]=null, buildmetadata: string[]=null) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.prerelease = prerelease;
    this.buildmetadata = buildmetadata;
  }
}
// TODO: toString() -> stringify()
