import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BasicSelect from '../selects/BasicSelect';
import {Stack} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const options = [
  {text: 'メール'},
  {text: '電話'},
  {text: '来店'},
  {text: '訪問'},

];

export default function InputMemoDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small" startIcon={<AddCommentIcon />}>
        メモを追加
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            メモを追加
            <IconButton color="primary" component="span" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} p={1}>
            <BasicSelect label="登録内容" options={options} />
            <TextField
              label="メモ"
              fullWidth
              variant="outlined"
              multiline
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}