import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { snackDetails } from '../../../helpers/converters';

const SimpleSnackbar = ({
  open,
  snackType,
  setSnackOpen,
}) => {
  const { duration, message, severity } = snackDetails(snackType);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <div>
      <Snackbar
        key={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={duration}
        transitionDuration={500}
        onClose={handleClose}
      >
        <Alert sx={{ fontSize: 16 }} onClose={handleClose} variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
