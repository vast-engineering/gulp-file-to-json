# gulp-file-to-json [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

Gulp plugin to convert a file and its MD5 hash value into a JSON representation.

## Install

    npm install --save-dev gulp-file-to-json

## Example

Transform demo.css:

```css
body {color: olive;}
```

Into demo.json:

```json
{
  "md5": "d8fba0d7a4fcb4a293d22ff3361d5a70",
  "value": "body {color: olive;}"
}
```

Using gulpfile.js:

```javascript
var gulp = require('gulp');
var file2json = require('gulp-file-to-json');

gulp.task('file-to-json', function () {
  return gulp.src('demo/demo.css')
    .pipe(file2json())
    .pipe(gulp.dest('./'));
});
```

## Credits

Inspired by [font-store](https://github.com/CrocoDillon/font-store) (Base64 encodes web fonts to cache in LocalStorage for high performance).

[npm-url]: https://www.npmjs.com/package/gulp-file-to-json
[npm-image]: https://badge.fury.io/js/gulp-file-to-json.svg
[travis-url]: https://travis-ci.org/TODO/gulp-file-to-json
[travis-image]: https://img.shields.io/travis/TODO/gulp-file-to-json.svg?branch=master
[coveralls-url]: https://coveralls.io/r/TODO/gulp-file-to-json
[coveralls-image]: https://img.shields.io/coveralls/TODO/gulp-file-to-json.svg
[depstat-url]: https://david-dm.org/TODO/gulp-file-to-json
[depstat-image]: https://david-dm.org/TODO/gulp-file-to-json.svg