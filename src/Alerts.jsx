import React from 'react';
import PropTypes from 'prop-types';


import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';

const cleanAndOrder = obj => Object.keys(obj)
  .map(key => ({ open: true, key, ...obj[key] }))
  .sort((a, b) => (a.timestamp - b.timestamp))
  .map((_p) => { const p = _p; delete p.timestamp; return p; });

const style = {
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 0px)',
};

const Alerts = ({ alerts }) => (
  <div style={style} >
    {cleanAndOrder(alerts.snackbars).map(p => (<Snackbar {...p} />))}
    {cleanAndOrder(alerts.dialogs).map(p => (<Dialog {...p} />))}
  </div>
);

Alerts.propTypes = {
  alerts: PropTypes.shape({
    dialogs: PropTypes.object.isRequired,
    snackbars: PropTypes.object.isRequired,
  }).isRequired,
};

export default Alerts;
