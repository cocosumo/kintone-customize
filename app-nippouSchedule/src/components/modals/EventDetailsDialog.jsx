import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  DialogTitle, Grid, Typography,
} from '@material-ui/core';
import CircleIcon from '@material-ui/icons/Circle';
import DescriptionIcon from '@material-ui/icons/Description';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { reduceEvent } from '../../helpers/DOM';
import { getOptionData } from '../../store/actionTypeData';
import { timeTo24Format } from '../../helpers/Time';
import { EditButton, CloseButton, DeleteButton } from '../UI/MaterialActionButtons';

const theme = createTheme();
theme.typography.h5 = {
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
theme.typography.subtitle1 = {
  fontSize: '1rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

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
  <Typography sx={{ display: 'block', pt: 0.25 }} variant="subtitle1">
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
      <Typography variant="h6">
        {actionDetails}
      </Typography>
    </Grid>
  </Grid>
);

const EventDetailsDialog = ({ selectedTime, onDetailsClose }) => {
  const selectedId = selectedTime?.id;
  const selectedFCEvent = reduceEvent(selectedTime);
  const {
    actionType, startTime, endTime, actionDetails,
  } = selectedFCEvent;

  const onCloseHandler = (event) => {
    onDetailsClose({ closeMethod: 'cancel', event });
  };

  const onDeleteHandler = (event) => {
    onDetailsClose({ closeMethod: 'delete', data: { id: selectedId } }, event);
  };

  const onEditHandler = (event) => {
    onDetailsClose({ closeMethod: 'edit' }, event);
  };

  const notEmptyActionDetails = Boolean(actionDetails);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open
        fullWidth
        maxWidth="xs"
        onBackdropClick={onCloseHandler}
        hideBackdrop
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
    </ThemeProvider>
  );
};

export default EventDetailsDialog;
