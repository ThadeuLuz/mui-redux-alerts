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

Material-UI and Redux are required for obvious reasons. Redux-thunk is needed to dispatch close actions asynchronously when snackbar's _autoHideDuration_ ends or when _onRequestClose_ gets triggered, which makes this library easier to use.

## Setup

### Add the Reducer to Redux store

The first step is to add the reducer to your rootReducer when creating Redux's store.
```JavaScript
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from 'mui-redux-alerts';

const rootReducer = combineReducers({
  // Add other reducers here
  alerts: reducer,
});

// Don't forget redux-thunk
const store = createStore(rootReducer, applyMiddleware(thunk));
```

### Add the Alerts component to the tree

The second step is to add the `Alerts` component somewhere in your app. Make sure this component is always visible because your snackbars and dialogs will be inside it in the dom tree. This component needs to have your `alerts`. There are several ways to do this, these are two of them:

```JavaScript
import { connect } from 'react-redux';
import { Alerts } from 'mui-redux-alerts';

// Example 1 - Unconnected parent

const mapStateToProps = (state) => ({ alerts: state.alerts });
const ConnectedAlerts = connect(mapStateToProps)(Alerts)

const App = () => (
  <div>
    // The rest of your app
    <ConnectedAlerts />
  </div>
);

export default App;

// Example 2 - Connected parent

const Layout = ({ alerts }) => (
  <div>
    // The rest of your app
    <Alerts alerts={alerts} />
  </div>
);

const mapStateToProps = (state) => ({ alerts: state.alerts });
export default connect(mapStateToProps)(Layout);
```

## Usage

Now that you are all setup, lets dispatch snackbars and dialogs. All use cases assume the `dispatch` function from Redux store and these:

```JavaScript
import { openDialog, openSnackbar, closeDialog, closeSnackbar } from 'mui-redux-alerts';
```

### Simple Examples

All you need is an object that will be used as props for your Dialogs/Snackbars. You can see which props you can use on Material-UI documentation for Snackbars and Dialogs. 

> Caveat: It is not necessary to mess with `open` and `onRequestClose` properties. They are filled automatically.

```JavaScript
dispatch(openSnackbar({ message: 'Simple Snackbar' })); // Click outside to dismiss
dispatch(openSnackbar({ message: 'Gone in 6 seconds', autoHideDuration: 6000 }));
dispatch(openDialog({
    title: 'Simple Dialog',
    children: 'Click outside or press ESC to close'
}));
```

### Dialogs with ID

If you need to close dialogs programatically, you can pass an ID (string) as the optional first argument and dispatch the `closeSnackbar` or `closeDialog` action.

```JavaScript
dispatch(openSnackbar('mySnackbar', { message: 'Simple Snackbar' }));
dispatch(openDialog('myDialog', {
    modal: true,
    title: 'Simple Dialog',
    children: "Can't close this."
}));

// And later
dispatch(closeSnackbar('mySnackbar'));
dispatch(closeDialog('myDialog'));
```

### Using a function for props

If instead of an object you send a function for props, it will be calld with a `close` function as the first argument.

```JavaScript
const getProps = close => ({
  modal: true,
  title: 'Custom Dialog',
  children: 'Click OK to close.',
  actions: [<RaisedButton label="OK" onTouchTap={close} />]
});

dispatch(openDialog(getProps));
dispatch(openDialog('myCustomDialog', getProps)); // Also works

// Later
dispatch(closeDialog('myCustomDialog'));
```

## Known issues

Since the elements are shown and hidden by being mounted/unmounted, no animation is shown. I'll fix this on the next version.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
