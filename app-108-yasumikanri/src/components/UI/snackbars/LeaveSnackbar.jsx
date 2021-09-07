import { Snackbar, SnackbarContent, Button } from '@mui/material';

const action = (
  <Button color="secondary" size="small">
    編集
  </Button>
);

const LeaveSnackBar = ({
  setLeaveSnackOpen,
  open,
  data,
}) => {
  const message = 'hello';
  console.log('snack');

  return (
    <Snackbar
      key={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      transitionDuration={500}
      onClose={() => setLeaveSnackOpen(false)}
    >
      <SnackbarContent message={message} action={action} />
    </Snackbar>
  );
};

export default LeaveSnackBar;
