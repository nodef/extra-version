function add(x: any, y: any): object {
  var major = x.major||0 + y.major||0;
  var minor = y.major? y.minor||0 : x.minor||0 + y.minor||0;
  var patch = y.major || y.minor? y.patch||0 : x.patch||0 + y.patch||0;
  var prerelease = y.prerelease || x.prerelease || '';
  var buildmetadata = y.buildmetadata || x.buildmetadata || '';
  return {major, minor, patch, prerelease, buildmetadata};
}
