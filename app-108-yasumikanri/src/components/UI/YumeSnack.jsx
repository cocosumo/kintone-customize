/* eslint-disable react/jsx-props-no-spreading */
import { Snackbar, Slide } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const YumeSnack = ({
  open, onClose, message, severity, duration, snackType,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(false);
  };

  const SlideTransition = (props) => <Slide {...props} onExited={handleClose} direction="down" />;

  return (
    <Snackbar
      id={snackType}
      key={snackType}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      TransitionComponent={SlideTransition}
      autoHideDuration={duration || 2000}
      onClose={onClose}
    >
      <MuiAlert sx={{ fontSize: 16 }} onClose={handleClose} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default YumeSnack;
