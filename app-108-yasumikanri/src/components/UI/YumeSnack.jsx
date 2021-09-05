import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const YumeSnack = ({
  open, onClose, message, severity, duration,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={duration || 2000}
    onClose={() => onClose(false)}
  >
    <MuiAlert sx={{ fontSize: 16 }} onClose={() => onClose(false)} variant="filled" severity={severity}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default YumeSnack;
