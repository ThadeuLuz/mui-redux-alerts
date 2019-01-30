//
// Constants
// ----------------------------------------------------------------------------

const OPEN_SNACKBAR = '@@mui-redux-alerts/OPEN_SNACKBAR';
const OPEN_DIALOG = '@@mui-redux-alerts/OPEN_DIALOG';
const CLOSE_SNACKBAR = '@@mui-redux-alerts/CLOSE_SNACKBAR';
const CLOSE_DIALOG = '@@mui-redux-alerts/CLOSE_DIALOG';

const initialState = {
  snackbars: {},
  dialogs: {},
};

//
// Reducer
// ----------------------------------------------------------------------------

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

//
// Helper Functions
// ----------------------------------------------------------------------------

let count = 0;

/**
 * Gets keys, props and a close function
 */
const getKeyProps = (first, second, dispatch, closeAction) => {
  let key;
  let propsOrGetProps;

  // Define key and props
  if (typeof first === 'string') {
    key = first;
    propsOrGetProps = second;
  } else {
    count += 1;
    key = `Snackbar_${count}`;
    propsOrGetProps = first;
  }

  const close = () => {
    dispatch(closeAction(key));
  };

  const props = typeof propsOrGetProps === 'function' ? propsOrGetProps(close, key) : propsOrGetProps;

  const props_ = {
    ...props,

    // Set default props
    timestamp: Date.now(),
    open: true,

    // override onClose
    onClose: (event, reason) => {
      close();

      // dialog and snackbar have same onClose function arguments
      // https://material-ui.com/api/snackbar/
      // https://material-ui.com/api/dialog/#dialog-api
      if (props.onClose) props.onClose(event, reason);
    },
  }

  return { key, props: props_ };
};

//
// Action Creators
// ----------------------------------------------------------------------------

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  payload: { key },
});

export const closeDialog = key => ({
  type: CLOSE_DIALOG,
  payload: { key },
});

export const openSnackbar = (keyOrPropsOrGetProps, propsOrGetProps) => (dispatch) => {
  const payload = getKeyProps(keyOrPropsOrGetProps, propsOrGetProps, dispatch, closeSnackbar);
  dispatch({ type: OPEN_SNACKBAR, payload });
};

export const openDialog = (keyOrPropsOrGetProps, propsOrGetProps) => (dispatch) => {
  const payload = getKeyProps(keyOrPropsOrGetProps, propsOrGetProps, dispatch, closeDialog);
  dispatch({ type: OPEN_DIALOG, payload });
};
