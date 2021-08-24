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
import { getOptionData } from '../../static/actionTypeData';
import { timeTo24Format } from '../../helpers/Time';

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

const TitleBar = ({ onClose, onDelete, onEdit }) => (
  <DialogTitle sx={{ py: 1, pr: 1 }}>
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
  </DialogTitle>
);
const TimeRange = ({ startTime, endTime }) => (
  <Typography sx={{ display: 'block', pt: 0.25 }} variant="subtitle2">
    {timeTo24Format(startTime)}
    ～
    {timeTo24Format(endTime)}
  </Typography>
);

const Content = ({ startTime, endTime, actionType }) => {
  const { bgColor } = getOptionData(actionType);

  return (
    <Grid sx={{ color: '#3c4043' }} container direction="row">
      <Grid>
        <CircleIcon sx={{
          color: bgColor, mt: 0.5, fontSize: '1.5em', mr: 2,
        }}
        />
      </Grid>
      <Grid>
        <Typography variant="h5">
          {actionType}
        </Typography>
        <TimeRange startTime={startTime} endTime={endTime} />
      </Grid>
    </Grid>
  );
};

const Description = ({ actionDetails }) => (
  <Grid sx={{ color: '#3c4043', mt: 2 }} container direction="row">
    <Grid>
      <DescriptionIcon sx={{ mt: 0.5, fontSize: '1', mr: 2 }} />
    </Grid>
    <Grid>
      <Typography variant="subtitle1">
        {actionDetails}
      </Typography>
    </Grid>
  </Grid>
);

const EventDetailsDialog = ({ selectedTime, onDetailsClose }) => {
  const selectedId = selectedTime?.id;
  const onCloseHandler = (event) => {
    onDetailsClose({ closeMethod: 'cancel', event });
  };

  const onDeleteHandler = (event) => {
    onDetailsClose({ closeMethod: 'delete', data: { id: selectedId } }, event);
  };

  const onEditHandler = (event) => {
    onDetailsClose({ closeMethod: 'edit' }, event);
  };

  const selectedFCEvent = reduceEvent(selectedTime);
  const {
    actionType, startTime, endTime, actionDetails,
  } = selectedFCEvent;

  const notEmptyActionDetails = Boolean(actionDetails);

  return (
    <Dialog
      open
      fullWidth
      maxWidth="xs"
      onBackdropClick={onCloseHandler}
    >
      <TitleBar
        onClose={onCloseHandler}
        onEdit={onEditHandler}
        onDelete={onDeleteHandler}
        eventId={selectedId}
      />
      <DialogContent>
        <Content actionType={actionType} startTime={startTime} endTime={endTime} />
        {notEmptyActionDetails && <Description actionDetails={actionDetails} />}
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
};

export default EventDetailsDialog;
