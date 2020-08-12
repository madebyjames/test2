var path = require('path');

// add the geckodriver path to process PATH
process.env.PATH += path.delimiter + path.join(__dirname, '..');

// support win32 vs other platforms
const configuredFilePath = process.env.npm_config_geckodriver_binary_filepath || process.env.GECKODRIVER_BINARY_FILEPATH;
if (configuredFilePath) {
  console.log('Using configured file path for geckodriver binary: ' + configuredFilePath);
  exports.path = configuredFilePath
} else {
  exports.path = process.platform === 'win32' ? path.join(__dirname, '..', 'geckodriver.exe') : path.join(__dirname, '..', 'geckodriver');
}

// specify the version of geckodriver
exports.version =  process.env.GECKODRIVER_VERSION || '0.26.0';

exports.start = function(args) {
  exports.defaultInstance = require('child_process').execFile(exports.path, args);
  return exports.defaultInstance;
}

exports.stop = function () {
  if (exports.defaultInstance !== null){
    exports.defaultInstance.kill();
  }
}
