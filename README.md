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


## Possible Improvements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In it's current state it is not ready for production. Some areas that could be improved are outlined below.

### Separation of layout and logic
In it's current state the app's components does not cleanly separate logic and layout. 
When adding the next features, it would make sense to look for repetitions, especially in terms of styles applied and extract pure layout components whereever it makes sense.

### Error handling

Right now network errors are just silently handled, but the user is not informed about them.
To give better feedback, a error display or notifications should be added to show that the API calls are failing and no data will be shown.

### Loading indicator

When the app starts fetching data from the Carbon Interface API, it should display an indicator that currently data is being loaded. This would improve the user experience because it is clearer that the submission was successful.

### Allow for a more convenient way to restart the process

When the user has started entering some data, she is not allowed to change the location any more.
To do so, the whole page needs to be reloaded. 
For convenience it would be nice to have a button that restarts the whole process.

### Nicer Design

A designer should definitely have a look at the app and propose some improvements to make it look nicer.
Material UI themes would allow  e.g. to change the color scheme easily.


### Mobile Friendlyness

The current layout does not fully work on really small screens. This should be tested further and improved - Material UI's Grid layout should support proper mobile layouts.


### Modular CSS

Right now there is only a handfull of custom styles used, but as soon as the `App.css` file starts growing, it would make sense to add CSS files per component, ideally using something like SCSS modules to keep all styles restricted to the scope of one component.


