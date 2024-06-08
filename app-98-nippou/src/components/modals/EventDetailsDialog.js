/* Deprecated */

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CircleIcon from '@mui/icons-material/Circle';
import DescriptionIcon from '@mui/icons-material/Description';

import {createTheme, ThemeProvider} from '@mui/material';
import {reduceEvent} from '../../helpers/DOM';
import {timeTo24Format} from '../../helpers/Time';
import {getActionTypeData} from '../../backend/fetchSettings';
import {EditButton, CloseButton, DeleteButton} from '../UI/MaterialActionButtons';


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

const TitleBar = ({onClose, onDelete, onEdit}) => {
  return (
    <DialogTitle sx={{py: 1, pr: 1}}>
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
};

const TimeRange = ({startTime, endTime}) => (
  <Typography sx={{display: 'block', pt: 0.25}} variant="subtitle1">
    {timeTo24Format(startTime)}
    ～
    {timeTo24Format(endTime)}
  </Typography>
);

const Content = ({startTime, endTime, actionType}) => {
  const {bgColor} = getActionTypeData(actionType);

  return (
    <Grid sx={{color: '#3c4043'}} container direction="row">
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

const Description = ({actionDetails}) => (
  <Grid sx={{color: '#3c4043', mt: 2}} container direction="row">
    <Grid>
      <DescriptionIcon sx={{mt: 0.5, fontSize: '1', mr: 2}} />
    </Grid>
    <Grid>
      <Typography variant="h6">
        {actionDetails}
      </Typography>
    </Grid>
  </Grid>
);

const EventDetailsDialog = ({selectedTime, onDetailsClose}) => {
  const selectedId = selectedTime?.id;
  const selectedFCEvent = reduceEvent(selectedTime);
  const {
    actionType, startTime, endTime, actionDetails,
  } = selectedFCEvent;

  const onCloseHandler = (event) => {
    onDetailsClose({closeMethod: 'cancel', event});
  };

  const onDeleteHandler = (event) => {
    onDetailsClose({closeMethod: 'delete', data: {id: selectedId}}, event);
  };

  const onEditHandler = (event) => {
    onDetailsClose({closeMethod: 'edit'}, event);
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
