import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const SimpleSnackbar = ({
  open,
  duration = 2000,
  message = 'error',
  severity = 'error',
  setSnackOpen,
}) => {
  // const [open, setOpen] = React.useState(false);

  /* const handleClick = () => {
    setOpen(true);
  }; */

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
