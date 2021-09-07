import {
  Alert, Button, Box, AlertTitle,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@material-ui/icons/Edit';
import { toLocaleDate } from '../../../helpers/time';

import { getKintoneDuration, getKintoneStatus, getKintoneType } from '../../../helpers/converters';

const onEditHandler = (id) => {
  window.open(`${recordPath(id)}&mode=edit`, '_blank');
};

const LeaveSnackbar = ({
  leaveSnack,
  setLeaveSnack,
}) => {
  const { isOpen, data, date } = leaveSnack;

  const {
    id, type, duration, status,
  } = data;
  let message = '';
  if (isOpen) {
    message = `${getKintoneDuration(duration)}${getKintoneType(type)}が${getKintoneStatus(status)}です。`;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setLeaveSnack((prev) => ({ ...prev, isOpen: false }));
  };

  const action = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      startIcon={<EditIcon />}
      onClick={() => onEditHandler(id)}
      sx={{ minWidth: 80 }}
    >
      編集
    </Button>
  );

  return (
    <div>
      <Snackbar
        key={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={2000}
        transitionDuration={500}
        onClose={handleClose}
      >
        <Alert sx={{ fontSize: 14 }} onClose={handleClose} variant="filled" severity="info" action={action}>
          <AlertTitle>{toLocaleDate(date)}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeaveSnackbar;
