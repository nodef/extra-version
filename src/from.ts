import type {IVersion} from './_types';

const DEFAULT = {
  major: 0,
  minor: 0,
  patch: 0,
  prerelease: '',
  buildmetadata: ''
};

function fromObject(x: IVersion): IVersion {
  return Object.assign({}, DEFAULT, x);
}

function from(s: string) {
}
export default from;
