# express-starterkit

This repository contains a simple code structure and boilerplate that could help you out at organizing your cool API project using Express.

This starter kit is inspired by [this awesome repository](https://github.com/santiq/bulletproof-nodejs).

## Folder structure

```
src
    app.js              # The main entry point that create an instance of our application.
    server.js           # Script to start our server.
    create-symlink.js   # Script that we use to avoid doing ../../  for relative requires.
    routes              # We define Express routes here.
    config              # Environment variables and configuration.
    loaders             # Split the startup process into tiny modules.
    models              # Put your database-related code here (models, queries, etc).
    services            # Business tier: all the business logic is here.
```

## What's included?

- config management using [dotenv](https://github.com/motdotla/dotenv)
- [eslint + prettier](https://prettier.io/docs/en/integrating-with-linters.html)
- [Travis CI](http://travis-ci.com/) for continuous integration
- `Procfile` file for deployments on [Heroku](https://www.heroku.com/).
- [nodemon](https://nodemon.io/) to automatically restart the server upon file changes.
- [Jest](https://jestjs.io/) for testing.

## Development

This starter kit uses the `node` version 12.13.0 (LTS version). You can use nvm to install and use this version.

```
nvm install 12.13.0
nvm use 12.13.0
```

We defined this version of node in the `.nvmrc` already, so you could do the following instead:

```
nvm install
nvm use
```

Run the following command to install the dependencies of this starter kit (do this only the first time).

```
npm install
```


Create the environment variables by issuing the following

```shell
cp .env.example .env
```
Then start the server with

```
npm start
```

## Relative requires

The `create-symlink.js` script runs as a postinstall hook. It allows us to use the following pattern for relative requires within our project.

```javascript
const User = require('@app/models/user');

// the rest of your code
```

Basically, `@app` is a symlink to the `src` folder. It plays nicely with IDEs (e.g., intellisense works). We also included a `preinstall` hook to stop npm from [erasing your src folder](https://gist.github.com/branneman/8048520#gistcomment-3009096).

## Installing additional dependencies

If you want to install a new dependency (e.g, `node-fetch`), do the following:

```
npm run i -- --save node-fetch
```

And to uninstall

```
npm run u -- node-fetch
```

### Why `npm run i` and `npm run u`?

The trick shown above that allows us to use relative requires comes with a catch. If we want to install a node library, say `node-fetch` we do:

```
npm install --save node-fetch
```

Doing this [will erase the content of your src folder](https://gist.github.com/branneman/8048520#gistcomment-3009096)!! Even though we already have the preinstall hook. That's why we rely on the `install-wrapper.js` to run `preinstall` and `postinstall` hooks when we install/uninstall dependencies.

## Heroku

Configure the following environment variable in your Heroku application to make sure Heroku does not delete the `src` folder during the build and deployment.

```
heroku config:set NPM_CONFIG_PRODUCTION=false NODE_MODULES_CACHE=false --app [your app name]
```

You could also configure the environment variables using Heroku's dashboard `Settings -> Reveal Config Vars`.

## TODO

- [ ] Add tests examples
- [ ] Add Swagger
- [ ] Add [celebrate](https://github.com/arb/celebrate)
- [ ] Add PostgreSQL example
