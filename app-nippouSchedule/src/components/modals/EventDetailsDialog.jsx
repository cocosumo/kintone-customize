import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  DialogTitle, Grid, IconButton, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircleIcon from '@material-ui/icons/Circle';
import DescriptionIcon from '@material-ui/icons/Description';
import { reduceEvent } from '../../helpers/DOM';

const CustomButton = ({ sx, onClick, icon }) => (
  <IconButton sx={sx} onClick={onClick}>
    {icon}
  </IconButton>
);

const CloseButton = ({ onClick }) => (
  <CustomButton sx={{ ml: 1 }} onClick={onClick} icon={<CloseIcon />} />
);

const EditButton = ({ onClick }) => (
  <CustomButton sx={{ ml: 1 }} onClick={onClick} icon={<EditIcon />} />
);

const DeleteButton = ({ onClick }) => (
  <CustomButton sx={{ ml: 1 }} onClick={onClick} icon={<DeleteIcon />} />
);

const TitleBar = ({ onCloseHandler }) => (
  <DialogTitle sx={{ py: 1, pr: 1 }}>
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="baseline"
    >
      <EditButton />
      <DeleteButton />
      <CloseButton onClick={onCloseHandler} />
    </Grid>
  </DialogTitle>
);
const TimeRange = () => <Typography sx={{ display: 'block', pt: 0.25 }} variant="subtitle2">8月 24日 (火曜日)⋅午前9:30～10:30</Typography>;

const Content = () => (
  <Grid sx={{ color: '#3c4043' }} container direction="row">
    <Grid>
      <CircleIcon sx={{ mt: 0.5, fontSize: '1.5em', mr: 2 }} />
    </Grid>
    <Grid>
      <Typography variant="h5">
        接客
      </Typography>
      <TimeRange />
    </Grid>
  </Grid>
);

const Description = () => (
  <Grid sx={{ color: '#3c4043', mt: 2 }} container direction="row">
    <Grid>
      <DescriptionIcon sx={{ mt: 0.5, fontSize: '1', mr: 2 }} />
    </Grid>
    <Grid>
      <Typography variant="subtitle1">
        heeloooo
      </Typography>
    </Grid>
  </Grid>
);

const EventDetailsDialog = ({ selectedTime, optionsData, onFormClose }) => {
  const onCloseHandler = (event) => {
    onFormClose({ closeMethod: 'cancel', event });
  };

  const selectedFCEvent = reduceEvent(selectedTime);
  const {
    actionType, startTime, endTime, actionDetails,
  } = selectedFCEvent;

  console.log(selectedFCEvent);
  return (
    <Dialog
      open
      fullWidth
      maxWidth="xs"
      onBackdropClick={onCloseHandler}
    >
      <TitleBar onCloseHandler={onCloseHandler} />
      <DialogContent>
        <Content actionType={actionType} startTime={startTime} endTime={endTime} />
        <Description />
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default EventDetailsDialog;
