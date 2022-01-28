import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BasicSelect from '../selects/BasicSelect';
import {
  Stack,
  Box,
  FormControl,
  FormHelperText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Caption from '../typohraphies/Caption';
import LabeledCheckBox from '../checkboxes/LabeledCheckBox';

const options = [
  {text: '顧客情報'},
  {text: '打ち合わせ'},
  {text: '契約内容'},
  {text: '工事場所情報'},
  {text: '問い合わせ'},
  {text: 'その他'},

];

interface AgentsCheckValues {
  [key: string] : boolean
}

const AgentCheckbox = () => {
  const [agents, setAgents] = useState<AgentsCheckValues>({
    'ここすも営業': true,
    'ここすも工事': true,
    'ゆめてつAG': true
  });


  return (
    <FormControl>
      <FormHelperText>{'<通知する担当者を選択してください>'}</FormHelperText>
      <Box pl={2} borderRadius={2} border="1px solid #d4d7d7">
        <Stack direction="row" justifyContent="space-around">
          {Object.entries(agents).map(([key, value]) => {

            return (
              <LabeledCheckBox
                key={key}
                label={key}
                checked={value}
                setCheckedHandler={()=>setAgents((prev)=> ({...prev, [key]: !prev[key]}))}
              />);
          })}


        </Stack>
      </Box>
    </FormControl>
  );
};

export default function InputMemoDialog() {
  const [open, setOpen] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
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
            <Stack direction="row" justifyContent="end">顧客名：田中一郎</Stack>
            <BasicSelect label="登録内容" options={options} />
            <TextField
              label="メモ"
              fullWidth
              variant="outlined"
              multiline
            />
            <Stack direction="row" justifyContent="space-between">

              <LabeledCheckBox label="担当者に通知する" checked={isNotify} setCheckedHandler={()=>setIsNotify(prev=> !prev)} />
              <Stack>
                <Caption text="作成日時：2022.1.28T12:10" />
                <Caption text="作成者：健太郎" />
              </Stack>
            </Stack>
            {isNotify && <AgentCheckbox />}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}