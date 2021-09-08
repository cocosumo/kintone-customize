import { Alert, Button, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@material-ui/icons/Edit';
import { getKintoneDuration, getKintoneStatus, getKintoneType } from '../../../helpers/converters';
import { toLocaleDate } from '../../../helpers/time';
import { recordPath } from '../../../../../kintone-api/api';

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

  let kintoneStatus = getKintoneStatus(status);
  if (kintoneStatus && kintoneStatus.includes('承認')) {
    kintoneStatus += '済';
  }

  const message = `${getKintoneType(type)}が${kintoneStatus}です。`;

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
        autoHideDuration={3000}
        transitionDuration={500}
        onClose={handleClose}
      >
        <Alert sx={{ fontSize: 14 }} onClose={handleClose} variant="filled" severity="info" action={action}>
          <AlertTitle sx={{ fontSize: 16 }}>{`${toLocaleDate(date)}(${getKintoneDuration(duration)})`}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeaveSnackbar;
