// Load dependencies
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var file2json = require('index.js');

// Generate example.json (from contents of example.css and it's md5 hash)
gulp.task('json-file', function () {
    return gulp.src('example/example.css')
        .pipe(file2json())
        .pipe(rename(function (path) {
            path.extname = '.json';
        }))
        .pipe(gulp.dest('example'));
});

// Generate example.css.md5 (from "md5" value in example.json)
gulp.task('md5-file', ['json-file'], function () {
    var json = JSON.parse(fs.readFileSync('./example/example.json', 'utf8'));
    fs.writeFileSync('./example/example.css.md5', json.md5);
});
