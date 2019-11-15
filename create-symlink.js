// script taken from this post https://gist.github.com/branneman/8048520#gistcomment-1412502
// This script run as a postinstall hook, it does not confuse IDEs (e.g., intellisense works)
const fs = require('fs');

// the src path relative to node_module
const srcpath = '../src';
const dstpath = 'node_modules/@app';

fs.exists(dstpath, function(exists) {
  // create the link only if the dest does not exist!
  if (!exists) {
    fs.symlinkSync(srcpath, dstpath, 'dir');
  }
});
