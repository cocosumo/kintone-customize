
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography} from '@mui/material';
import {isMobile} from '@yumetetsu/library';


import './FullScreenModal.css';
import Zoomer from './Zoomer';

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

    <Dialog
      open={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      fullScreen={isMobile}
      maxWidth="lg"
    >
      <DialogTitle sx={{pb: 0}}>
        <Stack
          justifyContent="space-between"
          direction="row"
        >

          <Stack spacing={2} direction="row">
            {HeaderComponent}
          </Stack>
          {
            !isMobile &&
              <Stack alignItems="center" justifyContent="center">
                <Typography fontSize={12}>マウスをドラッグして画像を動かして下さい。</Typography>
                <Typography fontSize={12}>マウスホイールを使用すると、表示倍率を変更できます。</Typography>
              </Stack>
          }

          <Stack >
            <CloseModal onClick={closeHandler} />
          </Stack>
        </Stack>

      </DialogTitle>
      <Zoomer {...{pdfWrapperRef}}>
        {children}
      </Zoomer>

      <DialogActions>
        <Button variant="contained" onClick={closeHandler}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>

  );
}
