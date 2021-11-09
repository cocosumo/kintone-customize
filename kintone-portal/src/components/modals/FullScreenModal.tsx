/* eslint-disable jsx-a11y/no-autofocus */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export default function FullScreenModal({
  isModalOpen, setIsModalOpen, children, HeaderComponent
} : ModalProps) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        fullScreen={fullScreen}
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" >
          {HeaderComponent}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeHandler} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
