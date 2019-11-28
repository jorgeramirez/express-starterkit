const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('@app/routes');
const config = require('@app/config');

// adapted from: https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/express.ts

async function loader(app) {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library or 401 in general.
     */
    if (err.name === 'UnauthorizedError' || err.status === 401) {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    let status = err.status || 400;

    // TODO: define a helper function that creates an ApplicationError instance
    if (err.name === 'ApplicationError') {
      status = 500;
    }
    res.status(status);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
}

module.exports = loader;
