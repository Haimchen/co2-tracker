# CO₂ Tracker

An app to track the CO₂ emissions caused by your energy consumption.

## Running the app locally

Navigate to the root directory and make sure all dependencies are installed:

```
yarn install
```

Running the app also requires a valid API Key for [Carboninterface](https://www.carboninterface.com). To receive a free key, you need to [sign up](https://www.carboninterface.com/users/sign_up) and retrieve your personal key.

There are two ways to set the key in development mode:

You can either create a `.env` file in the root of the project with the following content (where <your key> should be replaced with your carbon interface API key):
```
REACT_APP_CI_API_KEY=<your key>
```
Alternatively you can export the key as a local environment variable by running:
```
export REACT_APP_CI_API_KEY=<your key>
```
This will make the API key available in your console during the current session, but you will need to do it again when you start a new session.


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



