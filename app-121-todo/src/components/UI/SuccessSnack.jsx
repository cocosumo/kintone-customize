import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SuccessSnack = ({ snackIsOpen, closeSnackHandler }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={snackIsOpen}
    autoHideDuration={3000}
    onClose={closeSnackHandler}
  >
    <Alert
      onClose={closeSnackHandler}
      severity="success"
      variant="filled"
    >
      出来ました。
    </Alert>
  </Snackbar>
);

export default SuccessSnack;
