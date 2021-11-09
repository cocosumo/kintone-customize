/* eslint-disable jsx-a11y/no-autofocus */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ButtonProps {
  onClick?: ()=>any

}

const CloseModal = ({onClick} : ButtonProps) =>(
  <IconButton size="large" color="primary" aria-label="zoom out" component="span" {...{onClick}}>
    <CloseIcon />
  </IconButton>);

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
          <Stack
            justifyContent="space-between"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Stack >
              :)
            </Stack>
            <Stack spacing={2} direction="row">
              {HeaderComponent}
            </Stack>
            <Stack >
              <CloseModal onClick={closeHandler} />
            </Stack>
          </Stack>

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
