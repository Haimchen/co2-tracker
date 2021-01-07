# CO₂ Tracker

An app to track the CO₂ emissions caused by your energy consumption.

## Running the app locally

Navigate to the root directory and make sure all dependencies are installed:

```
yarn install
```

Running the app also requires a valid API Key for [Carboninterface](https://www.carboninterface.com). To receive a free key, you need to [sign up](https://www.carboninterface.com/users/sign_up) and retrieve your personal key.

**TODO** How to set the key?

To start the app in development mode with hot reloading run:
```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Running the tests

To run the tests interactively in watch mode:

```
yarn test
```

To just run all tests once (e.g. in a CI pipeline) you can use this command:
```
CI=true yarn test
```

## Creating a production build

With the dollowing command you can create a build that can be used to deploy the app:

```
yarn build
```

The output can be found in the `build` folder.\
It will bundle the application in production mode and optimize the build for the best performance:
The JS code is minified and the filenames include hashes to allow proper cache invalidation.


## Architecture

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

