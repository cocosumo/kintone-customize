import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
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
        open={open}
        autoHideDuration={duration}
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
