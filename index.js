var crypto = require('crypto'); // native node cryptographic functionality module (md5, sha1)
var through = require('through2'); // a thin wrapper around node transform streams
var gutil = require('gulp-util'); // gulp utilities

// Consts
const PLUGIN_NAME = 'gulp-file-to-json';

// Calculate m5d hash
function calcMd5 (data) {
  var cripter = crypto.createHash('md5');
  var md5 = cripter.update(data).digest('hex');

  return md5;
}

// Plugin level function (dealing with files)
module.exports = function () {
    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        var fileContents = JSON.stringify(file.contents.toString());
        var output = '{"md5":"' + calcMd5(file.contents) + '","value":' + fileContents + '}';

        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Stream not supported'));
            return cb(null, file);
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(output);
        }

        cb(null, file);
    });
};
