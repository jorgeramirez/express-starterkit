const config = require('./config');
const Logger = require('./loaders/logger');

async function runServer() {
  const app = await require('./app')();

  app.listen(config.port, error => {
    if (error) {
      Logger.error(error);
      process.exit(1);
      return;
    }
    Logger.info(`
      --------------------------------------------
        Server listening on port: ${config.port}  
      --------------------------------------------
    `);
  });
}

runServer();
