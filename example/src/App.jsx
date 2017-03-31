import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { openSnackbar, openDialog, Alerts } from '../lib/';

import simpleSnackbar from './alerts/simpleSnackbar';
import simpleDialog from './alerts/simpleDialog';
import customDialog from './alerts/customDialog';
import customSnackbar, { snackbarStackStyle } from './alerts/customSnackbar';

const style = {
  margin: 8,
};


const App = ({ alerts, dispatch }) => (
  <div>
    <RaisedButton
      primary
      label="Simple Dialog"
      style={style}
      onTouchTap={() => { dispatch(openDialog('simpleDialog', simpleDialog)); }}
    />
    <RaisedButton
      secondary
      label="Simple Snackbar"
      style={style}
      onTouchTap={() => { dispatch(openSnackbar('simpleSnackbar', simpleSnackbar)); }}
    />
    <RaisedButton
      primary
      label="Custom Dialog"
      style={style}
      onTouchTap={() => { dispatch(openDialog('customDialog', customDialog)); }}
    />
    <RaisedButton
      secondary
      label="Custom Snackbar"
      style={style}
      onTouchTap={() => {
        dispatch(openSnackbar('customSnackbar', customSnackbar));
      }}
    />
    <RaisedButton
      primary
      label="Delayed Dialog"
      style={style}
      onTouchTap={() => {
        setTimeout(() => {
          const ts = Date.now();
          dispatch(openDialog(`Dialog_${ts}`, {
            title: `Consider only victory. ${ts}`,
            children: 'Make defeat an impossibility in your mind.',
          }));
        }, 2000);
      }}
    />
    <RaisedButton
      secondary
      label="Delayed Snackbar"
      style={style}
      onTouchTap={() => {
        const ts = Date.now();
        setTimeout(() => {
          dispatch(openSnackbar(`Snackbar_${ts}`, {
            style: snackbarStackStyle,
            message: `The cycle begins anew ${ts}`,
          }));
        }, 2000);
      }}
    />
    <Alerts alerts={alerts} />
  </div>
);

App.propTypes = {
  alerts: PropTypes.shape({
    dialogs: PropTypes.object.isRequired,
    snackbars: PropTypes.object.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ alerts }) => ({ alerts }))(App);
