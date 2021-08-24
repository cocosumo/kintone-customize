/* eslint-disable react/jsx-props-no-spreading */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { Grid, DialogTitle } from '@material-ui/core';

import EventInputForm from '../forms/EventInputForm';
import { ISOtoDATE } from '../../helpers/Time';
import { reduceEvent } from '../../helpers/DOM';

const EventEditDialog = ({
  open, onFormClose, selectedTime, optionsData,
}) => {
  const selectedFCEvent = reduceEvent(selectedTime);
  const selectedId = selectedTime?.id;
  const isEventPressed = Boolean(selectedId);
  const [startTime, setStartTime] = useState(ISOtoDATE(selectedFCEvent.startTime));
  const [endTime, setEndTime] = useState(ISOtoDATE(selectedFCEvent.endTime));
  const [actionType, setActionType] = useState(
    selectedFCEvent.actionType || optionsData[0].type,
  );
  const [actionDetails, setActionDetails] = useState(selectedFCEvent.actionDetails);
  const [isError, setIsError] = useState();

  const changeStartTimeHandler = (value) => {
    if (!value) {
      setStartTime('');
      setEndTime(null);
    } else {
      setStartTime(value);
      if (value > endTime) {
        setEndTime(value);
      }
    }
  };
  const changeEndTimeHandler = (value) => {
    const validValue = startTime > value ? startTime : value;
    setEndTime(validValue);
  };

  const changeActionTypeHandler = (el) => {
    setActionType(el.target.value);
  };

  const changeActionDetailsHandler = (el) => {
    setActionDetails(el.target.value);
  };

  const changeHandlers = [
    changeStartTimeHandler,
    changeEndTimeHandler,
    changeActionTypeHandler,
    changeActionDetailsHandler,
  ];

  const newEvent = {
    id: selectedTime?.id,
    startTime,
    endTime,
    actionType,
    actionDetails,
  };

  return (

    <Dialog
      open={open}
      maxWidth="xs"
      onBackdropClick={(event) => onFormClose({ closeMethod: 'cancel', event })}
      /* TransitionProps={{ onExited: exitedHandler }} */
    >
      <DialogTitle />
      <DialogContent>
        <EventInputForm
          onChangeHandlers={changeHandlers}
          FCEventContents={newEvent}
          optionsData={optionsData}
          setIsError={setIsError}

        />
      </DialogContent>
      <DialogActions>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Grid>
            {isEventPressed && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => onFormClose({ closeMethod: 'delete', data: { id: selectedId } })}
            >
              削除
            </Button>

            )}
          </Grid>
          <Grid>

            <Button
              onClick={() => onFormClose({ closeMethod: 'cancel' })}
            >
              キャンセル
            </Button>

            <Button
              disabled={isError}
              variant="contained"
              onClick={() => onFormClose({ closeMethod: 'save', data: newEvent })}
            >
              保存
            </Button>
          </Grid>
        </Grid>

      </DialogActions>
    </Dialog>

  );
};

export default EventEditDialog;
