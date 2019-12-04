// This script is reponsible of deleting the @app symlink (cross-platform)
// source: https://github.com/abrighenti/se2-project/blob/master/delete-symlink.js
const fs = require('fs');
const process = require('process');

// the src path relative to node_module
const dstpath = 'node_modules/@app';

fs.stat(dstpath, function(err, exists) {
  if (exists) {
    if (process.platform === 'win32') {
      fs.rmdirSync(dstpath);
    } else if (process.platform === 'linux') {
      fs.unlinkSync(dstpath);
    }
  }
});
