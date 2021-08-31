import { Grid } from '@material-ui/core';
import { EditButton, DeleteButton, CloseButton } from './MaterialActionButtons';

const TitleBar = ({ onClose, onDelete, onEdit }) => (
  <Grid
    container
    direction="row"
    justifyContent="flex-end"
    alignItems="baseline"
  >
    <EditButton onClick={onEdit} />
    <DeleteButton onClick={onDelete} />
    <CloseButton onClick={onClose} />
  </Grid>
);

export default TitleBar;
