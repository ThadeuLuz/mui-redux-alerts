// Action Types
const OPEN_SNACKBAR = '@@mui-redux-alerts/OPEN_SNACKBAR';
const OPEN_DIALOG = '@@mui-redux-alerts/OPEN_DIALOG';
const CLOSE_SNACKBAR = '@@mui-redux-alerts/CLOSE_SNACKBAR';
const CLOSE_DIALOG = '@@mui-redux-alerts/CLOSE_DIALOG';

const initialState = {
  snackbars: {},
  dialogs: {},
};

// Reducer
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        snackbars: { [action.payload.key]: action.payload.props, ...state.snackbars },
        dialogs: state.dialogs,
      };
    case OPEN_DIALOG:
      return {
        snackbars: state.snackbars,
        dialogs: { [action.payload.key]: action.payload.props, ...state.dialogs },
      };
    case CLOSE_SNACKBAR: {
      const { [action.payload.key]: omit, ...snackbars } = state.snackbars;
      return { snackbars, dialogs: state.dialogs };
    }
    case CLOSE_DIALOG: {
      const { [action.payload.key]: omit, ...dialogs } = state.dialogs;
      return { snackbars: state.snackbars, dialogs };
    }
    default:
      return state;
  }
};

// Action Creators
export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  payload: { key },
});

export const closeDialog = key => ({
  type: CLOSE_DIALOG,
  payload: { key },
});

export const openSnackbar = (key, getProps) => (dispatch) => {
  const closeMe = () => {
    dispatch(closeSnackbar(key));
  };

  const props = typeof getProps === 'function' ? getProps(closeMe, key) : getProps;
  props.timestamp = Date.now();
  props.open = true;


  // onRequestClose monkey patch
  const originalOnRequestClose = props.onRequestClose;
  props.onRequestClose = (buttonClicked) => {
    closeMe();
    if (originalOnRequestClose) originalOnRequestClose(buttonClicked);
  };

  dispatch({
    type: OPEN_SNACKBAR,
    payload: { key, props },
  });
};

export const openDialog = (key, getProps) => (dispatch) => {
  const closeMe = () => {
    dispatch(closeDialog(key));
  };

  const props = typeof getProps === 'function' ? getProps(closeMe, key) : getProps;
  props.timestamp = Date.now();
  props.open = true;

  // onRequestClose monkey patch
  const originalOnRequestClose = props.onRequestClose;
  props.onRequestClose = (buttonClicked) => {
    closeMe();
    if (originalOnRequestClose) originalOnRequestClose(buttonClicked);
  };

  dispatch({
    type: OPEN_DIALOG,
    payload: { key, props },
  });
};
