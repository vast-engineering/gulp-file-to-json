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
module.exports = function (options) {
    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        var prefix = new Buffer('{"md5":"' + calcMd5(file.contents) + '","value":');
        var contents = new Buffer(JSON.stringify(file.contents.toString()));
        var sufix = new Buffer('}');

        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Stream not supported')); // TODO?
            return cb(null, file);
        }

        if (file.isBuffer()) {
            file.contents = Buffer.concat([prefix, contents, sufix]);
        }

        cb(null, file);
    });
};
