// Load dependencies
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var file2json = require('index.js');

// Generate demo.json (from contents of demo.css and it's md5 hash)
gulp.task('json-file', function () {
    return gulp.src('demo/demo.css')
        .pipe(file2json())
        .pipe(rename(function (path) {
            path.extname = '.json';
        }))
        .pipe(gulp.dest('demo'));
});

// Generate demo.css.md5 (from "md5" value in demo.json)
gulp.task('md5-file', ['json-file'], function () {
    var json = JSON.parse(fs.readFileSync('./demo/demo.json', 'utf8'));
    fs.writeFileSync('./demo/demo.css.md5', json.md5);
});
