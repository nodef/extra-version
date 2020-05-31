A version is a set of numbers that identify a unique evolution of a system. [:running:] [:package:] [:moon:] [:ledger:]

Methods as separate packages:
- `@extra-version/next`: use [rollup] to bundle this es module.
- `@extra-version/next.min`: use in browser ([browserify], [uglify-js]).

Most of the ideas are from [semver] by [Isaac Schlueter], and [SemVer spec]
by [Tom Preston]. You can notice that i have followed Javascript naming
scheme as far as possible.

> Stability: Experimental.

```javascript
const array = require('extra-array');
// import * as array from 'extra-array';
// import * as array from 'https://unpkg.com/extra-array@2.8.22/index.mjs'; (deno)

var x = [1, 2, 3];
array.get(x, -1);
// 3

var x = [1, 2, 3, 4];
array.swap(x, 0, 1);
// [2, 1, 3, 4]

var x = [1, 2, 3, 4];
array.rotate(x, 1);
// [4, 1, 2, 3]

var x = [1, 3, 5, 7];
array.bsearch(x, 5);
// 2           ^ found

[...array.permutations([1, 2, 3])];
// [
//   [],          [ 1 ],
//   [ 2 ],       [ 3 ],
//   [ 1, 2 ],    [ 1, 3 ],
//   [ 2, 1 ],    [ 2, 3 ],
//   [ 3, 1 ],    [ 3, 2 ],
//   [ 1, 2, 3 ], [ 1, 3, 2 ],
//   [ 2, 1, 3 ], [ 2, 3, 1 ],
//   [ 3, 1, 2 ], [ 3, 2, 1 ]
// ]
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
