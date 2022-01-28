import {Box} from '@mui/system';
import {Typography, Stack, Paper} from '@mui/material';
import Note from '../../../ui/cards/Note';
import InputMemoDialog from '../../../ui/dialogs/InputMemoDialog';


export default function Notes() {
  /* TODO: Get from database */
  const notes = ['顧客情報', '打ち合わせ', '契約内容', '工事場所情報', '問い合わせ', 'その他'];

  return (
    <Paper>
      <Box p={2}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">【メモ】</Typography>
            {/* <Button size="small" variant="contained" startIcon={<AddCommentIcon />}>
              メモ追加
            </Button> */}
            <InputMemoDialog />
          </Stack>
          {notes.map((note) => <Note key={note} type={note} />)}
        </Stack>

      </Box>
    </Paper>
  );
}