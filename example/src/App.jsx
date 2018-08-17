import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '@material-ui/core/RaisedButton';

import { connect } from 'react-redux';
import { openSnackbar, openDialog, Alerts } from '../lib/';

import simpleSnackbar from './alerts/simpleSnackbar';
import simpleDialog from './alerts/simpleDialog';
import customDialog from './alerts/customDialog';
import customSnackbar, { snackbarStackStyle } from './alerts/customSnackbar';

const style = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    textAlign: 'center',
    padding: 8,
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
  },
  button: {
    marginBottom: 8,
    width: '100%',
  },
};


const App = ({ alerts, dispatch }) => (
  <div style={style.row} >
    <div style={style.cell} >
      <RaisedButton
        primary
        label="Simple Dialog"
        style={style.button}
        onTouchTap={() => { dispatch(openDialog('simpleDialog', simpleDialog)); }}
      />
      <RaisedButton
        primary
        label="Simple Dialog (no key)"
        style={style.button}
        onTouchTap={() => { dispatch(openDialog(simpleDialog)); }}
      />
      <RaisedButton
        primary
        label="Custom Dialog"
        style={style.button}
        onTouchTap={() => { dispatch(openDialog('customDialog', customDialog)); }}
      />

      <RaisedButton
        primary
        label="Delayed Dialog"
        style={style.button}
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
    </div>
    <div style={style.cell} >
      <RaisedButton
        secondary
        label="Simple Snackbar"
        style={style.button}
        onTouchTap={() => { dispatch(openSnackbar('simpleSnackbar', simpleSnackbar)); }}
      />
      <RaisedButton
        secondary
        label="Simple Snackbar (no key)"
        style={style.button}
        onTouchTap={() => { dispatch(openSnackbar(simpleSnackbar)); }}
      />

      <RaisedButton
        secondary
        label="Custom Snackbar"
        style={style.button}
        onTouchTap={() => {
          dispatch(openSnackbar('customSnackbar', customSnackbar));
        }}
      />
      <RaisedButton
        secondary
        label="Delayed Snackbar"
        style={style.button}
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
    </div>
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
