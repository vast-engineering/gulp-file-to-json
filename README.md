# gulp-file-to-json

Output file contents and it's md5 hash value in JSON format.

Transforms this:

    body {color: olive;}

Into this:

    {
      "md5" : "d8fba0d7a4fcb4a293d22ff3361d5a70",
      "value" : "body {color: olive;}"
    }

## Install

    npm install --save-dev gulp-file-to-json

## Usage

    var gulp = require('gulp');
    var file2json = require('gulp-file-to-json');

    gulp.task('file-to-json', function () {
      return gulp.src('demo/demo.css')
        .pipe(file2json())
        .pipe(gulp.dest('./'));
    });

Advanced usage with [gulp-rename](https://www.npmjs.com/package/gulp-rename):

    var fs = require('fs');
    var gulp = require('gulp');
    var rename = require('gulp-rename');
    var file2json = require('index.js');

    // Create demo.json (from contents of demo.css and it's md5 hash)
    gulp.task('json-file', function () {
      return gulp.src('demo/demo.css')
      .pipe(file2json())
      .pipe(rename(function (path) {
        path.extname = '.json';
      }))
      .pipe(gulp.dest('demo'));
    });

    // Create demo.css.md5 (from "md5" value in demo.json)
    gulp.task('md5-file', ['json-file'], function () {
      var json = JSON.parse(fs.readFileSync('./demo/demo.json', 'utf8'));
      fs.writeFileSync('./demo/demo.css.md5', json.md5);
    });

## TODO

* Add pre-commit hook for jscs.

## Credits

Inspired by [font-store](https://github.com/CrocoDillon/font-store) (base64 encodes web fonts to cache in LocalStorage for high performance).

## The License (MIT)

Copyright (c) 2016 Vast

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
