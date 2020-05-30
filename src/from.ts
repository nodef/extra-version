import type {IVersion} from './_types';

const DEFAULT = {
  major: 0,
  minor: 0,
  patch: 0,
  prerelease: '',
  buildmetadata: ''
};
const RVERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;


// make this the default yo dawg, rrarf rrarf
function fromObject(x: IVersion): IVersion {
  return Object.assign({}, DEFAULT, x);
}

// shouldnt this be combined together too
// what about a combined function
function fromString(x: string): IVersion {
  var [,m, n, o, prerelease, buildmetadata] = x.match(RVERSION);
  var major = parseInt(m, 10);
  var minor = parseInt(n, 10);
  var patch = parseInt(o, 10);
  return {major, minor, patch, prerelease, buildmetadata};
}

function from(s: string) {
}
export default from;
