const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');

async function installWrapper() {
  try {
    console.log('Running preinstall hook');
    await exec('npm run preinstall');
    console.log(`Running npm ${process.argv[2]}`);
    const npmArgs = process.argv.slice(2);
    await new Promise((resolve, reject) => {
      const install = spawn('npm', npmArgs, { stdio: 'inherit' });
      install.on('error', reject);
      install.on('close', code => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
    console.log('Running postinstall hook');
    await exec('node ./create-symlink.js');
  } catch (error) {
    console.error(error);
  }
}

installWrapper();
