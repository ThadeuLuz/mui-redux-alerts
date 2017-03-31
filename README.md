# Mui Redux Alerts

Material-UI + Redux Dialogs and Snackbars. 

According to Material-UI documentation, [Snackbar](http://www.material-ui.com/#/components/snackbar) and [Dialog](http://www.material-ui.com/#/components/dialog) components are presented and used exactly as every other component. Although that's the 'react way' to use them, I personaly feel that due to their volatile nature, they should'nt be used as fixed components with display being set by a parent component. If you also use redux, there is another way.

This library alows you to open and close Snackbars and Dialogs by dispatching actions.

## Installing

Install with:

```
$ npm i -S mui-redux-alerts
```

This library has three peer dependencies that need to be in your project for it to work: [Material-UI](https://github.com/callemall/material-ui), [Redux](https://github.com/reactjs/redux) and the [Redux Thunk](https://github.com/gaearon/redux-thunk) middleware, so remember to install them too:

```
$ npm i -S material-ui redux redux-thunk
```

Material-UI and Redux are required for obvious reasons. Redux-thunk is needed to dispatch close actions asynchronously when snackbar's _autoHideDuration_ ends or when _onRequestClose_ gets triggered, which makes it a lot simpler to use.

## Usage

The first step is to add the reducer to your rootReducer when creating Redux's store (don't forget Redux Thunk).

```JavaScript
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as alerts } from 'mui-redux-alerts';

const rootReducer = combineReducers({
  // Add your other reducers here
  alerts,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
```

The second step is to add the `Alerts` component somewhere in your app. Make sure this component is always visible because your snackbars and dialogs will be inside it in the dom tree. This component needs three properties: 
  - The `alerts` object from your redux, created on the previous step
  - Your Material UI `Dialog` component
  - Your Material UI `Snackbar` component

```JavaScript
import { connect } from 'react-redux';
import { Alerts } from 'mui-redux-alerts';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

const mapStateToProps = ({ alerts }) => ({ alerts });

const ConnectedAlerts = connect(mapStateToProps)(Alerts)

const App = () => (
  <div>
    // The rest of your app
    <ConnectedAlerts dialog={Dialog} snackbar={Snackbar} />
  </div>
);
```

The last step is to just dispatch `openDialog`, `openSnackbar`, `closeDialog`, `closeSnackbar` actions as needed.

```JavaScript
import { openDialog, openSnackbar, closeDialog, closeSnackbar } from 'mui-redux-alerts';

// You can pass an object...
dispatch(openSnackbar('simpleSnackbar', { message: 'Simple Snackbar' }));

// ...or a function...
const getProps = (key) => ({
  title: 'Pain is an excellent teacher',
  children: 'Repetition is the path to mastery',
  actions: [
    <FlatButton label="OK" onTouchTap={ () => { dispatch(closeDialog(key)); } />
  ],
});

// ... for the props for your component
dispatch(openDialog('customDialog', getProps));

// Close them manually with their key
dispatch(closeSnackbar('simpleSnackbar'));
dispatch(closeDialog('customDialog'));
```

## Example

Check the example folder on this repo.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
