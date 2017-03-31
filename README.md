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

## Usage

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

The second step is to add the `Alerts` component somewhere in your app. Make sure this component is always visible because your snackbars and dialogs will be inside it in the dom tree. This component needs three props: 
  - `alert`: The `alerts` object from your redux, created on the previous step
  - `dialog`: Your Material UI `Dialog` component
  - `snackbar`: Your Material UI `Snackbar` component

```JavaScript
import { connect } from 'react-redux';
import { Alerts } from 'mui-redux-alerts';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

const mapStateToProps = (state) => ({ alerts: state.alerts });
const ConnectedAlerts = connect(mapStateToProps)(Alerts)

const App = () => (
  <div>
    // The rest of your app
    <ConnectedAlerts dialog={Dialog} snackbar={Snackbar} />
  </div>
);
```

### Dispatch actions to open and close dialogs and snackbars

The last step is to just dispatch `openDialog`, `openSnackbar`, `closeDialog`, `closeSnackbar` actions as needed.

```JavaScript
import { openDialog, openSnackbar, closeDialog, closeSnackbar } from 'mui-redux-alerts';

// You can pass a props object...
dispatch(openSnackbar('simpleSnackbar', { message: 'Simple Snackbar' }));

// ...or a function that returns the props.
// This makes it easier to add close buttons inside your dialog
const getProps = (closeMe) => ({
  title: 'Pain is an excellent teacher',
  children: 'Repetition is the path to mastery',
  actions: [
    <FlatButton label="OK" onTouchTap={ () => { closeMe(); } />
  ],
});

dispatch(openDialog('customDialog', getProps));

// You can also close them manually using the key
dispatch(closeSnackbar('simpleSnackbar'));
dispatch(closeDialog('customDialog'));
```

## Example

Check the example folder on this repo.

## Known issues

Since the elements are shown and hidden by being mounted/unmounted, no animation is shown. I'll fix this on the next version.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
