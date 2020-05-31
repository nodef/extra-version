/**
 * Regular expression to check a semver string.
 * @see https://regex101.com/r/vkijKf/1/
 */
const RVERSION = /^(0|[1-9]\d*)\.?(0|[1-9]\d*)?\.?(0|[1-9]\d*)?(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
export default RVERSION;
