A version is a set of numbers that identify a unique evolution of a system. [:running:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-version/next`: use [rollup] to bundle this es module.
- `@extra-version/next.min`: use in browser ([browserify], [uglify-js]).

Most of the ideas are from [semver] by [Isaac Schlueter], and [SemVer spec]
by [Tom Preston]. You can notice that i have followed Javascript naming
scheme as far as possible.

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
| [is]                  | Checks if value is array.
| [get]                 | Gets value at index.
| [set]                 | Sets value at index.
| [swap]                | Exchanges two values.
| [index]               | Gets zero-based index.
| [indexRange]          | Gets index range of part of array.
| [size]                | Gets size of part of array.

<br>

[![nodef](https://merferry.glitch.me/card/extra-version.svg)](https://nodef.github.io)

[semver]: https://www.npmjs.com/package/semver
[SemVer spec]: https://semver.org
[Isaac Schlueter]: https://izs.me
[Tom Preston]: https://tom.preston-werner.com
[:running:]: https://npm.runkit.com/extra-version
[:package:]: https://www.npmjs.com/package/extra-version
[:moon:]: https://www.npmjs.com/package/extra-version.min
[:ledger:]: https://unpkg.com/extra-version/
