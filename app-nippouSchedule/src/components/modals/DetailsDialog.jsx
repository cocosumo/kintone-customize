import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '@material-ui/core';

const DetailsDialog = () => {
  console.log('details');

  return (
    <Dialog
      open
      maxWidth="xs"
      onBackdropClick={(event) => onFormClose({ closeMethod: 'cancel', event })}
    >
      <DialogTitle />
      <DialogContent />
      <DialogActions />
    </Dialog>
  );
};

export default DetailsDialog;
