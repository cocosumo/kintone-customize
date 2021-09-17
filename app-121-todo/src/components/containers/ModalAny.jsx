import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const ModalAny = ({ children }) => (
  <div>
    <Dialog
      keepMounted
      open
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ zIndex: 9999 }}>
            {children}
          </Box>

          <DialogContentText id="alert-dialog-description">
            処理中です。少々お待ちください。
          </DialogContentText>
        </Stack>

      </DialogContent>

    </Dialog>
  </div>
);

export default ModalAny;
