import parse from './parse';
import Version from './Version';

/**
 * Converts value to version.
 * @param v a value
 * @returns version, or null
 */
function from(v: any): Version {
  if(typeof v==='number') v = v.toString();
  if(typeof v==='string') return parse(v, 0, -1)[1];
  return v && typeof v==='object'? new Version(
    v.major||0, v.minor||0, v.patch||0,
    v.prerelease||[], v.buildmetadata||[]
  ) : null;
}
export default from;
