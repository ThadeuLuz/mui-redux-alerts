export const snackbarStackStyle = {
  position: 'relative',
  left: 'initial',
  transform: 'initial',
  marginBottom: 8,
};

export default closeMe => ({
  style: { snackbarStackStyle },
  message: 'True self is without form',
  action: 'I See',
  autoHideDuration: 0,
  onActionTouchTap: () => { closeMe(); },
});
