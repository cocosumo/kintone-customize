/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { Grid, DialogTitle } from '@material-ui/core';
import EventInputForm from '../forms/EventInputForm';
import { reduceEvent } from '../../helpers/DOM';
import { CloseButton } from '../UI/MaterialActionButtons';
import { ISOtoDATE } from '../../helpers/Time';
import { getOptions } from '../../backend/fetchSettings';

const EventEditDialog = ({
  open, onFormClose, selectedTime,
}) => {
  const selectedFCEvent = reduceEvent(selectedTime);
  const selectedId = selectedTime?.id;
  const isEventPressed = Boolean(selectedId);
  const initialEndTime = ISOtoDATE(selectedFCEvent.endTime);

  const [startTime, setStartTime] = useState(ISOtoDATE(selectedFCEvent.startTime));
  const [endTime, setEndTime] = useState(initialEndTime);
  const [actionType, setActionType] = useState(
    selectedFCEvent.actionType || getOptions()[0].type,
  );
  const [actionDetails, setActionDetails] = useState(selectedFCEvent.actionDetails);
  const [errorFields, setErrorFields] = useState({});

  const changeStartTimeHandler = (value) => {
    if (!value) {
      setStartTime(0);
    } else {
      setStartTime(value);
      if (!value.invalid && value > endTime) {
        setEndTime(value);
      }
    }
  };
  const changeEndTimeHandler = (value) => {
    setEndTime(value);
  };

  const changeActionTypeHandler = (el) => {
    setActionType(el.target.value);
  };

  const changeActionDetailsHandler = (el) => {
    setActionDetails(el.target.value);
  };

  const newEvent = {
    id: selectedTime?.id,
    startTime,
    endTime,
    actionType,
    actionDetails,
  };

  const TitleBar = () => (
    <DialogTitle sx={{ py: 1, pr: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="baseline"
      >
        <CloseButton onClick={(event) => onFormClose({ closeMethod: 'cancel', event })} />
      </Grid>
    </DialogTitle>
  );

  return (

    <Dialog
      open={open}
      maxWidth="xs"
      onBackdropClick={(event) => onFormClose({ closeMethod: 'cancel', event })}
      hideBackdrop
    >
      <TitleBar />
      <DialogContent>
        <EventInputForm
          // onChangeHandlers={changeHandlers}
          onChangeStartTime={changeStartTimeHandler}
          onChangeEndTime={changeEndTimeHandler}
          onChangeActionType={changeActionTypeHandler}
          onChangeActionDetails={changeActionDetailsHandler}
          FCEventContents={newEvent}
          setErrorFields={setErrorFields}

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
              sx={{ fontSize: 16 }}
              onClick={() => onFormClose({ closeMethod: 'cancel' })}
            >
              キャンセル
            </Button>

            <Button
              sx={{ fontSize: 16 }}
              disabled={Boolean(Object.keys(errorFields).length)}
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
