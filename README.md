A [version] is a set of numbers that identify a unique evolution of a system. Most of the ideas are from [Semantic versioning] by [Tom Preston], and [semver] by [Isaac Schlueter].

▌
📦 [JSR](https://jsr.io/@nodef/extra-version),
📦 [NPM](https://www.npmjs.com/package/extra-version),
📰 [Docs](https://jsr.io/@nodef/extra-version/doc).


```javascript
import {* as version} from 'jsr:@nodef/extra-version';

let x = version.from('v1.2.3.4');
x.toString();
// '1.2.3+4'

let x = version.from('0.2');
version.isUnstable(x);
// true

let x = version.from('1.2');
let y = version.from('1.2.3');
version.compare(x, y);
// -3

let x = version.from('1.2');
let y = version.next(x, version.MINOR);
y.toString();
// '1.3.0'
```

### Reference

| Method                | Action
|-----------------------|-------
| [is]                  | Checks if value is version.
| [isUnstable]          | Checks if version is major 0, or pre-release.
| [from]                | Converts value to version.
| [parse]               | Converts string to version.
| [stringify]           | Converts version to string.
| [compare]             | Compares two versions.
| [isEqual]             | Checks if two versions are equal.
| [next]                | Gives the next version.
|                       |
| [MAJOR]               | Defines first major version. (1.0.0)
| [MINOR]               | Defines first minor version. (0.1.0)
| [PATCH]               | Defines first patch version. (0.0.1)
| [RVERSION]            | Regular expression to check a semver string.

<br>

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-version)


[version]: https://semver.org
[semver]: https://www.npmjs.com/package/semver
[Semantic versioning]: https://semver.org
[Isaac Schlueter]: https://izs.me
[Tom Preston]: https://tom.preston-werner.com
[is]: https://jsr.io/@nodef/extra-version/doc/~/is
[isUnstable]: https://jsr.io/@nodef/extra-version/doc/~/isUnstable
[from]: https://jsr.io/@nodef/extra-version/doc/~/from
[parse]: https://jsr.io/@nodef/extra-version/doc/~/parse
[stringify]: https://jsr.io/@nodef/extra-version/doc/~/stringify
[compare]: https://jsr.io/@nodef/extra-version/doc/~/compare
[isEqual]: https://jsr.io/@nodef/extra-version/doc/~/isEqual
[next]: https://jsr.io/@nodef/extra-version/doc/~/next
[MAJOR]: https://jsr.io/@nodef/extra-version/doc/~/MAJOR
[MINOR]: https://jsr.io/@nodef/extra-version/doc/~/MINOR
[PATCH]: https://jsr.io/@nodef/extra-version/doc/~/PATCH
[RVERSION]: https://jsr.io/@nodef/extra-version/doc/~/RVERSION
