import {Box} from '@mui/system';
import {Typography, Stack, Paper} from '@mui/material';
import Note from '../../../ui/cards/Note';
import InputMemoDialog from '../../../ui/dialogs/InputMemoDialog';


export default function Notes() {
  /* TODO: Get from database */
  const notes = ['メール', '電話', '来店', '訪問'];

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