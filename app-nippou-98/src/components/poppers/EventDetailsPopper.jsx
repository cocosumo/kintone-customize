/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import {
  Paper, Fade, Typography, Grid,
} from '@material-ui/core';
import CircleIcon from '@material-ui/icons/Circle';
import DescriptionIcon from '@material-ui/icons/Description';
import TitleBar from '../UI/TitleBar';
import { timeTo24Format } from '../../helpers/Time';
import { reduceEvent } from '../../helpers/DOM';
import { getOptionData } from '../../store/actionTypeData';

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
      <Box>
        <Typography variant="h5">
          {actionType}
        </Typography>
        <TimeRange startTime={startTime} endTime={endTime} />
      </Box>
    </Grid>
  );
};

const Description = ({ actionDetails }) => (
  <Grid sx={{ color: '#3c4043', mt: 2 }} container direction="row">
    <Grid>
      <DescriptionIcon sx={{ mt: 0.5, fontSize: '1', mr: 2 }} />
    </Grid>
    <Grid sx={{ color: '#3c4043', overflow: 'hidden' }}>
      <Typography sx={{ display: 'inline', wordWrap: 'break-word' }}>
        {actionDetails}
      </Typography>
    </Grid>
  </Grid>
);

export const EventDetailsPopper = ({
  id, open, anchorEl, selectedTime, onDetailsClose,
}) => {
  const selectedId = selectedTime?.id;
  const selectedFCEvent = reduceEvent(selectedTime);
  const {
    actionType, startTime, endTime, actionDetails,
  } = selectedFCEvent;
  const notEmptyActionDetails = Boolean(actionDetails);

  return (

    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="right"
      style={{ zIndex: 1900 }}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            fallbackPlacements: ['top', 'right', 'bottom'],
            padding: 8,
          },
        },
      ]}
      transition
    >

      {({ TransitionProps }) => (

        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Box sx={{
              pt: 1, pb: 2, pl: 2, pr: 1, maxWidth: 320,
            }}
            >
              <TitleBar
                onEdit={(event) => onDetailsClose({ closeMethod: 'edit' }, event)}
                onDelete={(event) => onDetailsClose({ closeMethod: 'delete', data: { id: selectedId } }, event)}
                onClose={onDetailsClose}
              />
              <Content actionType={actionType} startTime={startTime} endTime={endTime} />
              {notEmptyActionDetails && <Description actionDetails={actionDetails} />}
            </Box>
          </Paper>
        </Fade>
      )}

    </Popper>

  );
};

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <EventDetailsPopper id={id} open={open} anchorEl={anchorEl} />
    </div>
  );
}
