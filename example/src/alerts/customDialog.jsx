import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export default closeMe => ({
  modal: true,
  title: 'Pain is an excellent teacher',
  children: 'Repetition is the path to mastery',
  actions: [
    <FlatButton
      label="OK"
      primary
      keyboardFocused
      onTouchTap={() => { closeMe(); }}
    />,
  ],
});
