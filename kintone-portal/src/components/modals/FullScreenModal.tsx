
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import {useTheme} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';

import './FullScreenModal.css';

interface ButtonProps {
  onClick?: ()=>any

}

const CloseModal = ({onClick} : ButtonProps) =>(
  <IconButton size="large" color="primary" aria-label="zoom out" component="span" {...{onClick}}>
    <CloseIcon />
  </IconButton>);

export default function FullScreenModal({
  isModalOpen, setIsModalOpen, children, HeaderComponent, pdfWrapperRef
} : ModalProps) {

  // const theme = useTheme();
  //  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        maxWidth="lg"
        sx={{height: '100%'}}

      >
        <DialogTitle id="alert-dialog-title" >
          <Stack
            justifyContent="space-between"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >

            <Stack spacing={2} direction="row">
              {HeaderComponent}
            </Stack>
            <Stack >
              <CloseModal onClick={closeHandler} />
            </Stack>
          </Stack>

        </DialogTitle>

        <TransformWrapper maxPositionY={355} ref={pdfWrapperRef}>
          <TransformComponent>
            {children}
          </TransformComponent>
        </TransformWrapper>

        <DialogActions>
          <Button variant="contained" onClick={closeHandler}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
