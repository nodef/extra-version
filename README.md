A [version] is a set of numbers that identify a unique evolution of a system. [:running:] [:vhs:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-version/next`: use [rollup] to bundle this es module.
- `@extra-version/next.min`: use in browser ([browserify], [uglify-js]).

Most of the ideas are from [Semantic versioning] by [Tom Preston], and
[semver] by [Isaac Schlueter].

> Stability: Experimental.

```javascript
const version = require('extra-version');
// import * as version from 'extra-version';
// import * as version from 'https://unpkg.com/extra-version@1.0.0/index.mjs'; (deno)

var x = version.from('v1.2.3.4');
x.toString();
// '1.2.3+4'

var x = version.from('0.2');
version.isUnstable(x);
// true

var x = version.from('1.2');
var y = version.from('1.2.3');
version.compare(x, y);
// -3

var x = version.from('1.2');
var y = version.next(x, version.MINOR);
y.toString();
// '1.3.0'
```

### reference

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

[![nodef](https://merferry.glitch.me/card/extra-version.svg)](https://nodef.github.io)

[version]: https://semver.org
[browserify]: https://www.npmjs.com/package/browserify
[rollup]: https://www.npmjs.com/package/rollup
[uglify-js]: https://www.npmjs.com/package/uglify-js
[semver]: https://www.npmjs.com/package/semver
[Semantic versioning]: https://semver.org
[Isaac Schlueter]: https://izs.me
[Tom Preston]: https://tom.preston-werner.com
[:running:]: https://npm.runkit.com/extra-version
[:package:]: https://www.npmjs.com/package/extra-version
[:moon:]: https://www.npmjs.com/package/extra-version.min
[:ledger:]: https://unpkg.com/extra-version/
[rollup]: https://github.com/nodef/extra-version/wiki/rollup
[browserify]: https://github.com/nodef/extra-version/wiki/browserify
[uglify-js]: https://github.com/nodef/extra-version/wiki/uglify-js
[is]: https://github.com/nodef/extra-version/wiki/is
[isUnstable]: https://github.com/nodef/extra-version/wiki/isUnstable
[from]: https://github.com/nodef/extra-version/wiki/from
[parse]: https://github.com/nodef/extra-version/wiki/parse
[stringify]: https://github.com/nodef/extra-version/wiki/stringify
[compare]: https://github.com/nodef/extra-version/wiki/compare
[isEqual]: https://github.com/nodef/extra-version/wiki/isEqual
[next]: https://github.com/nodef/extra-version/wiki/next
[MAJOR]: https://github.com/nodef/extra-version/wiki/MAJOR
[MINOR]: https://github.com/nodef/extra-version/wiki/MINOR
[PATCH]: https://github.com/nodef/extra-version/wiki/PATCH
[RVERSION]: https://github.com/nodef/extra-version/wiki/RVERSION
[:vhs:]: https://asciinema.org/a/335555
